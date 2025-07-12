<template>
  <div>
    <v-card>
      <v-card-title>
        <PageHeader title="Сотрудники">
          <template #controls>
            <v-btn color="primary" @click="showCreate = true">Добавить</v-btn>
          </template>
        </PageHeader>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="employees"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        class="elevation-1"
      >
        <template #item.birthDate="{ item }">
          {{ formatDate(item.birthDate) }}
        </template>
        <template #item.active="{ item }">
          <v-switch v-model="item.active" disabled />
        </template>
        <template #item.actions="{ item }">
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn class="menu__btn" icon v-bind="props">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="onEdit(item)">
                <div class="d-flex align-center">
                  <v-list-item-icon>
                     <Icon icon="material-symbols:edit-rounded" width="20" height="20" />
                  </v-list-item-icon>
                  <v-list-item-title class="ml-2">Редактировать</v-list-item-title>
                </div>
              </v-list-item>
              <v-list-item @click="onDelete(item)">
                
                <div class="d-flex align-center">
                  <v-list-item-icon>
                    <Icon icon="material-symbols:delete-rounded" width="20" height="20" />
                  </v-list-item-icon>
                  <v-list-item-title class="ml-2">Удалить</v-list-item-title>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-navigation-drawer
      location="right"
      temporary
      v-model="showCreate"
      width="400"
      class="create-drawer"
    >
      <CreateForm @saved="onSaved" />
    </v-navigation-drawer>

    <v-navigation-drawer
      location="right"
      temporary
      v-model="showEdit"
      width="400"
      class="create-drawer"
    >
      <UpdateForm
        :modelValue="showEdit"
        :editId="editingId"
        @update:modelValue="showEdit = $event"
        @saved="onSaved"
      />
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useEmployeeStore } from '@/store/employee'
import type { Employee } from '@/types/employee'
import { Icon } from '@iconify/vue'
import { formatDate } from '@/utils/date'
import PageHeader from '@/components/PageHeader.vue'
import CreateForm from '@/pages/employee/ui/CreateForm.vue'
import UpdateForm from '@/pages/employee/ui/UpdateForm.vue'

const store = useEmployeeStore()

const employees =  computed(() => store.list)
const loading   = computed(() => store.loading)
const totalItems = computed(() => store.total)

const params = store.params

const currentPage = computed({
  get: () => params._page ?? 1,
  set: val => { params._page = val }
})
const pageSize = computed({
  get: () => params._limit ?? 10,
  set: val => { params._limit = val }
})

const options = ref({
  page: currentPage.value,
  itemsPerPage: pageSize.value,
  sortBy: [] as string[],
  sortDesc: [] as boolean[],
})


onMounted(() => {
  store.loadList()
})


const headers = [
  { 
    title: 'Фамилия',       
    key: 'lastName'    
  },
  { 
    title: 'Имя',
    key: 'firstName'
  },
  {
    title: 'Дата рождения',
    key: 'birthDate'
  },
  {
    title: 'Паспорт',
    key: 'passport'
  },
  {
    title: 'Пол',
    key: 'gender'
  },
  {
    title: 'Активен',
    key: 'active'
  },
  {
    title: 'Действия',
    key: 'actions',
    sortable: false
  },
]

const showCreate = ref(false)
const showEdit   = ref(false)
const editingId  = ref<number>(0)

function onEdit(item: Employee) {
  editingId.value = item.id
  showEdit.value = true
}

async function onDelete(item: Employee) {
  if (confirm(`Удалить сотрудника ${item.firstName} ${item.lastName}?`)) {
    await store.removeEmployee(item.id)
  }
}

function onSaved() {
  showCreate.value = false
  showEdit.value   = false
  store.loadList()
}
</script>

<style scoped></style>