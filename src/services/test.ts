import {
  Test,
  TestAutoSetKeys,
  TestCreate,
  testKeys,
  TestUpdate,
} from "@/interfaces/Test";
import { repository, ResultSetHeader } from "mysql2-wizard";

const repo = repository<Test, TestAutoSetKeys>({
  table: "test",
  keys: testKeys,
});

async function read(): Promise<Test[]>;
async function read(id: number): Promise<Test | undefined>;
async function read(id?: number): Promise<Test[] | Test | undefined> {
  if (!id) return repo.select();
  return repo.selectOne({ id });
}

async function create(test: TestCreate): Promise<ResultSetHeader> {
  return repo.insert([test]);
}

async function update(id: number, test: TestUpdate): Promise<ResultSetHeader> {
  return repo.update([[{ id }, test]]);
}

async function _delete(id: number): Promise<ResultSetHeader> {
  return repo.delete([{ id }]);
}

const testService = {
  read,
  create,
  update,
  delete: _delete,
};

export default testService;
