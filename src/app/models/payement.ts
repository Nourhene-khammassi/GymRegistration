// payment.model.ts
import { User } from "./register.model";

export class Payment {
    user!: User;
    paid!: boolean;
    month!: string; // Modifier le type de 'month' en 'string'
}
