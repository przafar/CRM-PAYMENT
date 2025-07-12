import { defineStore } from 'pinia'
import {
  fetchEmployees,
  FetchEmployeesParams,
  fetchEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '@/api/employee.service'
import type { Employee } from '@/types/employee'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    list: [] as Employee[],
    total: 0,
    params: { _page: 1, _limit: 10 } as FetchEmployeesParams,
    loading: false,
    detailLoading: false,
    error: null as string | null,
  }),

  getters: {
    activeEmployees: (state) => state.list.filter(e => e.active),
    inactiveEmployees: (state) => state.list.filter(e => !e.active),
    totalPages: (state) => {
      const limit = state.params._limit || 1
      return Math.ceil(state.total / limit)
    },
    employeeById: (state) => {
      return (id: number | string) => state.list.find(e => e.id === id) ?? null
    },
  },

  actions: {
    async loadList() {
      this.loading = true
      this.error = null
      try {
        const { data, total: count } = await fetchEmployees({
          _page: this.params._page,
          _limit: this.params._limit,
          _sort: this.params._sort,
          _order: this.params._order,
        })
        this.list = data
        this.total = count
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    async loadOne(id: number | string) {
      this.detailLoading = true
      this.error = null
      try {
        return await fetchEmployeeById(id)
      } catch (e: any) {
        this.error = e.message
        return null
      } finally {
        this.detailLoading = false
      }
    },

    async addEmployee(payload: Omit<Employee, 'id'>) {
      this.loading = true
      this.error = null
      try {
        const created = await createEmployee(payload)
        await this.loadList()
        return created
      } catch (e: any) {
        this.error = e.message
        return null
      } finally {
        this.loading = false
      }
    },

    async editEmployee(id: number | string, payload: Employee) {
      this.loading = true
      this.error = null
      try {
        const updated = await updateEmployee(id, payload)
        await this.loadList()
        return updated
      } catch (e: any) {
        this.error = e.message
        return null
      } finally {
        this.loading = false
      }
    },

    async removeEmployee(id: number | string) {
      this.loading = true
      this.error = null
      try {
        await deleteEmployee(id)
        await this.loadList()
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
  },
})