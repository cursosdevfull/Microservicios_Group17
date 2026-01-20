export interface GatewayPort {
    bookAppointment(slotId: number, patientId: number, country: string): Promise<any>;
    createUser(name: string, email: string, password: string): Promise<any>
    login(email: string, password: string): Promise<any>;
}