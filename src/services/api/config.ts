import { handler } from "api-wizard"

const config={
	api: "/api/server"
}
const http=handler(config)

export default http