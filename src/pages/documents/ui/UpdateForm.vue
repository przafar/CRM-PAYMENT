<template>
  <v-form ref="formRef" @submit.prevent="onSubmit">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <VSelect
            v-model="form.type"
            :items="docTypes"
            label="Тип документа"
            :rules="[v => !!v || 'Тип документа обязателен']"
            required
          />
        </v-col>

        <v-col cols="12">
          <VTextField
            v-model="form.number"
            label="Номер документа"
            :rules="[v => !!v || 'Номер обязателен']"
            required
          />
        </v-col>

        <v-col cols="12">
          <VMenu
            v-model="picker"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template #activator="{ props }">
              <VTextField
                v-bind="props"
                v-model="form.date"
                label="Дата документа"
                readonly
                :rules="[v => !!v || 'Дата обязательна']"
                required
              />
            </template>
            <VDatePicker v-model="form.date" @input="picker = false" />
          </VMenu>
        </v-col>

        <v-col cols="12">
          <VTextarea
            v-model="form.description"
            label="Описание"
            rows="3"
            :rules="[v => !!v || 'Описание обязательно']"
            required
          />
        </v-col>

        <v-col cols="12" v-if="form.type === 'счет-фактура'">
          <VSelect
            v-model="form.invoiceType"
            :items="invoiceTypes"
            label="Тип счет-фактуры"
            :rules="[v => !!v || 'Укажите тип']"
            required
          />
        </v-col>
        <v-col cols="12" v-if="form.type === 'доверенность'">
          <VTextField
            v-model="form.trusteeFullName"
            label="ФИО доверенного"
            :rules="[v => !!v || 'ФИО обязательно']"
            required
          />
        </v-col>

        <v-col cols="12">
          <VSelect
            v-model="form.employeeId"
            :items="employeeOptions"
            item-value="id"
            item-title="fullName"
            label="Сотрудник"
            :rules="[v => !!v || 'Сотрудник обязателен']"
            required
          />
        </v-col>

        <v-col cols="12" class="text-right">
          <VBtn color="primary" type="submit">Сохранить</VBtn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import { useDocumentStore } from '@/store/document'
import { useEmployeeStore } from '@/store/employee'
import type { Document } from '@/types/document'
import type { Employee } from '@/types/employee'
import { defineProps, defineEmits } from 'vue'
import {
  VForm, VContainer, VRow, VCol,
  VTextField, VSelect, VTextarea,
  VMenu, VDatePicker, VBtn
} from 'vuetify/components'

const props = defineProps<{
  modelValue: boolean
  editId: number | string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'saved'): void
}>()

const documentStore = useDocumentStore()
const employeeStore = useEmployeeStore()

type FormType = Omit<Document, 'id'>
const formRef = ref<InstanceType<typeof VForm> | null>(null)
const picker = ref(false)

const docTypes = ['счет-фактура', 'доверенность'] as const
const invoiceTypes = ['Стандартная', 'Дополнительная'] as const

watch(
  () => props.modelValue,
  async visible => {
    if (visible) {
      await employeeStore.loadList()
    }
  },
  { immediate: true }
)

const defaultForm: FormType = {
  type: 'счет-фактура',
  number: '',
  date: '',
  description: '',
  invoiceType: undefined,
  trusteeFullName: undefined,
  employeeId: undefined,
}
const form = reactive<FormType>({ ...defaultForm })

watch(
  () => props.modelValue,
  async visible => {
    emit('update:modelValue', visible)
    if (visible) {
      const data = await documentStore.loadOne(props.editId)
      Object.assign(form, data)
    }
  },
  { immediate: true }
)

const employeeOptions = computed(() =>
  employeeStore.list.map((e: Employee) => ({
    ...e,
    fullName: `${e.firstName} ${e.lastName}`,
  }))
)


async function onSubmit() {
  if (!formRef.value) return
  const { valid } = await formRef.value.validate()
  if (!valid) return

  const payload: Document = {
    id: typeof props.editId === 'number'
      ? props.editId
      : Number(props.editId),
    ...form,
  }

  await documentStore.editDocument(payload.id, payload)
  emit('saved')
  emit('update:modelValue', false)
}
</script>

<style scoped>
.create-drawer & {
  padding: 16px 24px;
}
</style>