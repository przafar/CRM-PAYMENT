import client from './client'
import type { Document } from '@/types/document'

export interface FetchDocumentsParams {
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'
  employeeId?: number
  [key: string]: any
}

export interface FetchDocumentsResponse {
  data: Document[]
  total: number
}


export async function fetchDocuments(
  params: FetchDocumentsParams = {}
): Promise<FetchDocumentsResponse> {
  const response = await client.get<Document[]>('/documents', { params })
  const totalHeader = response.headers['x-total-count']
  const total = totalHeader ? parseInt(totalHeader, 10) : 0
  return {
    data: response.data,
    total,
  }
}


export async function fetchDocumentById(
  id: number | string
): Promise<Document> {
  const response = await client.get<Document>(`/documents/${id}`)
  return response.data
}


export async function createDocument(
  payload: Omit<Document, 'id'>
): Promise<Document> {
  const response = await client.post<Document>('/documents', payload)
  return response.data
}


export async function updateDocument(
  id: number | string,
  payload: Document
): Promise<Document> {
  const response = await client.put<Document>(`/documents/${id}`, payload)
  return response.data
}


export async function deleteDocument(
  id: number | string
): Promise<void> {
  await client.delete(`/documents/${id}`)
}