<template>
  <v-form ref="formRef" @submit.prevent="onSubmit">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.lastName"
            label="Фамилия"
            :rules="[v => !!v || 'Фамилия обязательна']"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.firstName"
            label="Имя"
            :rules="[v => !!v || 'Имя обязательно']"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-menu
            v-model="picker"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290"
            min-width="290"
          >
            <template #activator="{ props }">
              <v-text-field
                v-bind="props"
                v-model="form.birthDate"
                label="Дата рождения"
                readonly
                :rules="[v => !!v || 'Дата обязательна']"
                required
              />
            </template>
            <v-date-picker v-model="form.birthDate" @input="picker = false" />
          </v-menu>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.passport"
            label="Серия и номер паспорта"
            :rules="[
              v => !!v || 'Паспорт обязателен',
            ]"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-select
            v-model="form.gender"
            :items="genders"
            label="Пол"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-switch
            v-model="form.active"
            label="Активен"
          />
        </v-col>

        <v-col cols="12" class="text-right">
          <v-btn color="primary" type="submit">Сохранить</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { fetchEmployeeById, updateEmployee } from '@/api/employee.service'
import { defineProps, defineEmits } from 'vue'
import type { Employee } from '@/types/employee'
import type { VForm } from 'vuetify/components'

const props = defineProps<{
  modelValue: boolean
  editId: number
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'saved'): void
}>()

const formRef = ref<InstanceType<typeof VForm>>()
const picker = ref(false)

type FormType = Omit<Employee, 'id'>
const defaultForm: FormType = {
  firstName: '',
  lastName: '',
  birthDate: '',
  passport: '',
  gender: 'Не указан',
  active: true,
}
const form = reactive<FormType>({ ...defaultForm })
const genders = ['Не указан', 'Мужской', 'Женский'] as const

watch(
  () => props.modelValue,
  async visible => {
    emit('update:modelValue', visible)
    if (visible) {
      const data = await fetchEmployeeById(props.editId)
      Object.assign(form, data)
    }
  }
)

async function onSubmit() {
  if (!formRef.value) return
  const { valid } = await formRef.value.validate()
  if (!valid) return
  await updateEmployee(props.editId, form as Employee)
  emit('saved')
  emit('update:modelValue', false)
}
</script>

<style scoped></style>