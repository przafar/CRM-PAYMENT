export interface Document {
  id: number
  type: 'счет-фактура' | 'доверенность'
  number: string
  date: string   
  description: string
  invoiceType?: 'Стандартная' | 'Дополнительная'  
  trusteeFullName?: string 
  employeeId?: number
}