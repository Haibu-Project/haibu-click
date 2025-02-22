import { BaseApi } from "../base-api";
import { RegisterType } from "./types";

export class RegisterApi extends BaseApi {
    public async post(body: RegisterType): Promise<any> {
        const response = await this.axios.post("/api/auth/register", body);
        return response.data;
    }
}