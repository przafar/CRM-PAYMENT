import client from './client'
import { Employee } from '@/types/employee'

export interface FetchEmployeesParams {
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'
  [key: string]: any
}

export interface FetchEmployeesResponse {
  data: Employee[]
  total: number
}

export async function fetchEmployees(
  params: FetchEmployeesParams = {}
): Promise<FetchEmployeesResponse> {
  const response = await client.get<Employee[]>('/employees', { params })
  const totalHeader = response.headers['x-total-count']
  const total = totalHeader ? parseInt(totalHeader, 10) : 0
  return {
    data: response.data,
    total,
  }
}

export async function fetchEmployeeById(
  id: number | string
): Promise<Employee> {
  const response = await client.get<Employee>(`/employees/${id}`)
  return response.data
}

export async function createEmployee(
  payload: Omit<Employee, 'id'>
): Promise<Employee> {
  const response = await client.post<Employee>('/employees', payload)
  return response.data
}

export async function updateEmployee(
  id: number | string,
  payload: Employee
): Promise<Employee> {
  const response = await client.put<Employee>(`/employees/${id}`, payload)
  return response.data
}

export async function deleteEmployee(
  id: number | string
): Promise<void> {
  await client.delete(`/employees/${id}`)
}