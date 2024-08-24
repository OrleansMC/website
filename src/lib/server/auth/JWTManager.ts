import jwt from "jsonwebtoken";

declare global {
    var jwtManager: JWTManager;
}

type JWTToken = {
    session_id: string;
}

export default class JWTManager {
    public static getInstance(): JWTManager {
        if (!global.jwtManager) {
            global.jwtManager = new JWTManager();
        }

        return global.jwtManager;
    }

    public async generateToken(sessionId: string): Promise<string> {
        const payload = { session_id: sessionId };

        return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    }

    public getSessionIdFromJWT(token: string): string | null {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTToken;
            return decoded.session_id;  // Doğrulama başarılı, session_id döndür
        } catch (error) {
            return null;  // Doğrulama başarısız
        }
    }
}