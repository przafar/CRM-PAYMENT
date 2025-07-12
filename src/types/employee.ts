export interface Employee {
  id: number
  firstName: string
  lastName: string
  birthDate: string  
  passport: string  
  gender: 'Не указан' | 'Мужской' | 'Женский'
  active: boolean
}