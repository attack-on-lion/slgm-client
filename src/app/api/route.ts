import testService from "@/services/test";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const tests = await testService.read();
  return NextResponse.json(tests);
};

export const POST = async (request: NextRequest) => {
  const test = await request.json();
  const result = await testService.create(test);
  return NextResponse.json(result);
};
