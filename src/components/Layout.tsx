import React, { useRef, useState } from "react";
import "twin.macro";
import tw from "twin.macro";
import { useLayoutConfig } from "../hooks/useLayoutConfig";
import { ILayout, ILayoutProperty } from "../layouts/types";
import { Field, Label } from "./Field";
import { Input } from "./Input";
import { PopoverColorPicker } from "./PopoverColorPicker";
import { Select } from "./Select";

export interface Props {
  layout: ILayout;
}

export const Layout: React.FC<Props> = ({ layout }) => {
  return (
    <div className={`layout-${layout.name}`} tw="space-y-4">
      {layout.properties.map(p => (
        <LayoutProperty key={p.name} property={p} />
      ))}
    </div>
  );
};

const UploadButton = tw.button`
  px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border border-gray-300
  cursor-pointer transition-colors flex-shrink-0
`;

export const LayoutProperty: React.FC<{
  property: ILayoutProperty;
}> = ({ property: p }) => {
  const [layoutConfig, setLayoutConfig] = useLayoutConfig();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        // Upload to our API and get a URL back
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });
        
        if (response.ok) {
          const { url } = await response.json();
          // Use full URL for the image
          const fullUrl = `${window.location.origin}${url}`;
          setLayoutConfig({ [p.name]: fullUrl });
        } else {
          alert("Failed to upload image");
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
      setIsUploading(false);
    }
  };

  // Check if this is an image URL field
  const isImageField = p.name.toLowerCase().includes("image") || 
                       p.name.toLowerCase().includes("screenshot") ||
                       p.name.toLowerCase().includes("logo");

  return (
    <Field>
      <Label>{p.name} </Label>

      <div tw="w-full">
        {p.type === "text" ? (
          <div tw="flex gap-2">
            <Input
              placeholder={p.placeholder ?? `Value for ${p.name}`}
              value={layoutConfig[p.name] ?? ""}
              onChange={e => setLayoutConfig({ [p.name]: e.target.value })}
            />
            {isImageField && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/gif,image/svg+xml"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <UploadButton
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? "..." : "Upload"}
                </UploadButton>
              </>
            )}
          </div>
        ) : p.type === "number" ? (
          <Input
            placeholder={p.placeholder ?? `Value for ${p.name}`}
            value={layoutConfig[p.name] ?? ""}
            type="number"
            onChange={e => setLayoutConfig({ [p.name]: e.target.value })}
          />
        ) : p.type === "select" ? (
          <Select
            options={p.options.map(value => ({ value }))}
            value={layoutConfig[p.name] ?? ""}
            onChange={value => setLayoutConfig({ [p.name]: value })}
          />
        ) : p.type === "color" ? (
          <PopoverColorPicker
            color={layoutConfig[p.name] ?? p.default}
            onChange={value => setLayoutConfig({ [p.name]: value })}
          />
        ) : null}
      </div>
    </Field>
  );
};
