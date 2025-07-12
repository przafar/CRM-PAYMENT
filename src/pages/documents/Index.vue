<template>
  <div>
    <v-card>
      <v-card-title>
        <PageHeader
          title="Документы"
          :filters-visible="showFilters"
          @toggle-filters="showFilters = !showFilters"
        >
          <template #controls>
            <v-btn color="primary" @click="showCreate = true">Добавить</v-btn>
          </template>

          <template #filters>
            <FilterForm
              v-model:modelValueNumber="filterNumber"
              v-model:modelValueEmployee="selectedEmployeeId"
              :itemsEmployee="employeeOptions"
              v-model:modelValueDocType="filterDocType"
              :itemsDocType="documentTypes"
            />
          </template>
        </PageHeader>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="documents"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        class="elevation-1"
      >
        <template #item.date="{ item }">
          {{ formatDate(item.date) }}
        </template>
        <template #item.description="{ item }">
          <span class="text-truncate" style="max-width:200px; display:block;">
            {{ item.description }}
          </span>
        </template>
        <template #item.actions="{ item }">
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn class="menu__btn" icon v-bind="props">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="onView(item)">
                <div class="d-flex align-center item">
                  <v-list-item-icon>
                    <Icon icon="material-symbols:eye-tracking-outline-rounded" width="20" height="20" />
                  </v-list-item-icon>
                  <v-list-item-title class="ml-2">Просмотр</v-list-item-title>
                </div>
              </v-list-item>
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
      <CreateDocumentForm @saved="reload" />
    </v-navigation-drawer>

    <v-navigation-drawer
      location="right"
      temporary
      v-model="showEdit"
      width="400"
      class="create-drawer"
    >
      <UpdateDocumentForm
        :modelValue="showEdit"
        :editId="editingId"
        @update:modelValue="showEdit = $event"
        @saved="reload"
      />
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'
import debounce from 'lodash/debounce'
import { useDocumentStore } from '@/store/document'
import { useEmployeeStore } from '@/store/employee'
import { Icon } from '@iconify/vue'
import { formatDate } from '@/utils/date'
import PageHeader from '@/components/PageHeader.vue'
import FilterForm from './components/FilterForm.vue'
import CreateDocumentForm from './ui/CreateForm.vue'
import UpdateDocumentForm from './ui/UpdateForm.vue'

type Document = { id: number; number: string; date: string; description: string }
type Employee = { id: number; firstName: string; lastName: string }

const docStore = useDocumentStore()
const empStore = useEmployeeStore()

const documents = computed(() => docStore.list)
const loading = computed(() => docStore.loading)
const totalItems = computed(() => docStore.total)
const options = ref(
  {
    page: 1,
    itemsPerPage: 10,
    sortBy: [] as string[],
    sortDesc: [] as boolean[]
  }
)

const documentTypes = ['счет-фактура', 'доверенность']
const showFilters = ref(false)
const filterNumber = ref('')
const selectedEmployeeId = ref<number|null>(null)
const filterDocType = ref<string|null>(null)
const filterDate = ref('')

const employeeOptions = computed(() =>
  empStore.list.map((e: Employee) => ({ id: e.id, fullName: `${e.firstName} ${e.lastName}` }))
)

const headers = [
  { 
    title: 'Тип', 
    key: 'type' 
  },
  { 
    title: 'Номер', 
    key: 'number' 
  },
  { 
    title: 'Дата', 
    key: 'date' 
  },
  { 
    title: 'Описание', 
    key: 'description' 
  },
  { 
    title: 'Действия', 
    key: 'actions', 
    sortable: false 
  },
]

const applyFilters = debounce(() => {
  docStore.params._page = 1
  docStore.params.number = filterNumber.value || undefined
  docStore.params.employeeId = selectedEmployeeId.value ?? undefined
  docStore.params.type = filterDocType.value ?? undefined
  docStore.loadList()
}, 700)

watch([filterNumber, selectedEmployeeId, filterDocType], applyFilters, { immediate: true })


const showCreate = ref(false)
const showEdit = ref(false)
const editingId = ref(0)

function reload() {
  showCreate.value = false
  showEdit.value = false
  docStore.loadList()
}

function onView(item: Document) {}
function onEdit(item: Document) {
  editingId.value = item.id
  showEdit.value = true
}

async function onDelete(item: Document) {
  if (confirm(`Удалить документ №${item.number}?`)) {
    await docStore.removeDocument(item.id)
  }
}

</script>

<style scoped></style>