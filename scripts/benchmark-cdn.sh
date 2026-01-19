#!/bin/bash

# Benchmark script to compare performance with and without CDN

URL="https://og.dailyfoss.biz.id/api/image?fileType=png&layoutName=dailyfoss-beta&Theme=dark&Title=Test&Description=Benchmark"

echo "=========================================="
echo "OG Image Service Benchmark"
echo "=========================================="
echo ""

# Test 1: Single request (cold cache)
echo "Test 1: Single Request (Cold Cache)"
echo "-----------------------------------"
time curl -s -o /dev/null -w "HTTP Status: %{http_code}\nTime: %{time_total}s\n" "$URL"
echo ""

# Test 2: Single request (warm cache)
echo "Test 2: Single Request (Warm Cache)"
echo "-----------------------------------"
time curl -s -o /dev/null -w "HTTP Status: %{http_code}\nTime: %{time_total}s\n" "$URL"
echo ""

# Test 3: 10 concurrent requests
echo "Test 3: 10 Concurrent Requests"
echo "-------------------------------"
ab -n 10 -c 10 -q "$URL" 2>&1 | grep -E "(Requests per second|Time per request|Failed requests)"
echo ""

# Test 4: 100 requests with 10 concurrent
echo "Test 4: 100 Requests (10 concurrent)"
echo "------------------------------------"
ab -n 100 -c 10 -q "$URL" 2>&1 | grep -E "(Requests per second|Time per request|Failed requests|Complete requests)"
echo ""

# Test 5: Check cache headers
echo "Test 5: Cache Headers"
echo "--------------------"
curl -s -I "$URL" | grep -E "(cache|Cache|cf-cache-status|X-Cache-Status)"
echo ""

echo "=========================================="
echo "Benchmark Complete"
echo "=========================================="
