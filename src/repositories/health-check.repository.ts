import {apiUrl, nodeEnvIsDevelopment} from "../api/constants";
import {api} from "../api/config";
import {ResolverMethods} from "./base.repository";

export class HealthCheckRepository {
    static readonly defaultUrl = `${apiUrl}/`;

    static getHealthCheck() {
        if (nodeEnvIsDevelopment) {
            return Promise.resolve({});
        }
        return api[ResolverMethods.get](`${this.defaultUrl}healthz`);
    }
}