import crypto from 'crypto';



export const encryptVariant = (size: string, planterSku: string) => {
    const algorithm = 'aes-256-cbc';

    const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';
    const encryptionIv = process.env.NEXT_PUBLIC_ENCRYPTION_IV || '';

    const key = Buffer.from(encryptionKey, 'utf-8');
    const iv = Buffer.from(encryptionIv, 'utf-8');

    const path = {
        'size': size,
        'planterSku': planterSku
    }

    const jsonString = JSON.stringify(path);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(jsonString, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    const urlSafeEncrypted = encrypted.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    console.log("env", urlSafeEncrypted)

    return urlSafeEncrypted;
}


export const decryptVariant = (encryptedData: string) => {
    const algorithm = 'aes-256-cbc';
    const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';
    const encryptionIv = process.env.NEXT_PUBLIC_ENCRYPTION_IV || '';

    if (!encryptionKey || !encryptionIv) {
        throw new Error('Encryption key and IV must be set in the environment variables.');
    }

    const key = Buffer.from(encryptionKey, 'utf-8');
    const iv = Buffer.from(encryptionIv, 'utf-8');

    const base64Encrypted = encryptedData.replace(/-/g, '+').replace(/_/g, '/');

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(base64Encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted); 
}