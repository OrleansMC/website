import jwt from "jsonwebtoken";

declare global {
    var jwtManager: JWTManager;
}

type JWTToken = {
    session_token: string;
}

export default class JWTManager {
    public static getInstance(): JWTManager {
        if (!global.jwtManager) {
            global.jwtManager = new JWTManager();
        }

        return global.jwtManager;
    }

    public generateToken(sessionToken: string): string {
        const payload = { session_token: sessionToken };

        return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    }

    public getSessionTokenFromJWT(token: string): string | null {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTToken;
            return decoded.session_token;  // Doğrulama başarılı, session_token döndür
        } catch (error) {
            return null;  // Doğrulama başarısız
        }
    }

    public generateResetPasswordToken(key: string): string {
        const payload = { key };

        return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '5m' });
    }

    public getKeyFromForgotPasswordToken(token: string): string | null {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { key: string };
            return decoded.key;  // Doğrulama başarılı, key döndür
        } catch (error) {
            return null;  // Doğrulama başarısız
        }
    }
}