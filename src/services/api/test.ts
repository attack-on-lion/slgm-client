import { Test } from "@/interfaces/Test";
import http from "./config";

const api= http.api()

async function get(){	
	const res=await api.get<Test[]>('/tests')
	return res.data
}

const testApi={
	get
}
export default testApi