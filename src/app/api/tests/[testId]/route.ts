import testService from "@/services/test";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { testId: number } }
) => {
  const tests = await testService.read(params.testId);
  return NextResponse.json(tests);
};

export const PATCH = async (
  request: Request,
  { params }: { params: { testId: number } }
) => {
  try {
    const test = await request.json();
    const result = await testService.update(params.testId, test);
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { testId: number } }
) => {
  try {
    const result = await testService.delete(params.testId);
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
  }
};
