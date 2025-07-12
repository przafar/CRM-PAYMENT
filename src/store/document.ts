import { defineStore } from 'pinia'
import {
  fetchDocuments,
  FetchDocumentsParams,
  fetchDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from '@/api/document.service'
import type { Document } from '@/types/document'

export const useDocumentStore = defineStore('documents', {
  state: () => ({
    list: [] as Document[],
    total: 0,
    params: {
      _page: 1,
      _limit: 10,
      _sort: undefined,
      _order: undefined,
      employeeId: undefined,
      number: undefined,
      type: undefined,
    } as FetchDocumentsParams & {
      number?: string
      type?: string
      date?: string
    },
    loading: false,
    detailLoading: false,
    error: null as string | null,
  }),

  getters: {
    totalPages: (state) => {
      const limit = state.params._limit || 1
      return Math.ceil(state.total / limit)
    },
    byType: (state) => {
      return (type: string) => state.list.filter(d => d.type === type)
    },
    documentById: (state) => {
      return (id: number | string) => state.list.find(d => d.id === id) || null
    },
  },

  actions: {
    async loadList() {
      this.loading = true
      this.error = null
      try {
        const { data, total: count } = await fetchDocuments(this.params)
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
        return await fetchDocumentById(id)
      } catch (e: any) {
        this.error = e.message
        return null
      } finally {
        this.detailLoading = false
      }
    },

    async addDocument(payload: Omit<Document, 'id'>) {
      this.loading = true
      this.error = null
      try {
        const created = await createDocument(payload)
        await this.loadList()
        return created
      } catch (e: any) {
        this.error = e.message
        return null
      } finally {
        this.loading = false
      }
    },

    async editDocument(id: number | string, payload: Document) {
      this.loading = true
      this.error = null
      try {
        const updated = await updateDocument(id, payload)
        await this.loadList()
        return updated
      } catch (e: any) {
        this.error = e.message
        return null
      } finally {
        this.loading = false
      }
    },

    async removeDocument(id: number | string) {
      this.loading = true
      this.error = null
      try {
        await deleteDocument(id)
        await this.loadList()
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
  },
})