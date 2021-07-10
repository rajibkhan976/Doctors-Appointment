export function createAppointment(appointmentInfo) {
    return {
        data: appointmentInfo,
        type: 'CREATE_APPOINTMENT'
    }
}