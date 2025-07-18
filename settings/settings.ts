import path from "path";
import { cwd } from "process";

export const BASE_URL = process.env.BASE_URL;

export const TMP_LOCATION = path.join(cwd(), 'tmp');
export const SESSION_FILE_PATH = path.join(TMP_LOCATION, 'session.json');

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
