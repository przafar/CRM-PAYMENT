<template>
  <v-form ref="formRef" @submit.prevent="onSubmit" >
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
            <v-date-picker  v-model="form.birthDate" @input="picker = false" />
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
          />
        </v-col>
        <v-col cols="12">
          <v-switch
            v-model="form.active"
            label="Активен"
          />
        </v-col>

        <v-col cols="12" class="text-right">
          <v-btn color="primary" type="submit">
            Создать
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits } from 'vue'
import { createEmployee } from '@/api/employee.service'
import { Employee } from '@/types/employee'

type NewEmployee = Omit<Employee, 'id'>

const emit = defineEmits<{ (e: 'saved'): void }>()

const formRef = ref()
const picker = ref(false)

const form = reactive<NewEmployee>({
  firstName: '',
  lastName: '',
  birthDate: '',
  passport: '',
  gender: 'Не указан',
  active: true,
})
const genders = ['Не указан', 'Мужской', 'Женский']

async function onSubmit() {
  if (!formRef.value) return

  const { valid } = await formRef.value.validate()
  if (!valid) return

  await createEmployee(form)
  emit('saved')

  Object.assign(form, {
    firstName: '',
    lastName: '',
    birthDate: '',
    passport: '',
    gender: 'Не указан',
    active: true,
  })
  picker.value = false
}
</script>

<style scoped></style>