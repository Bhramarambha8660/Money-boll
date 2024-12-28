<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-slide-item  v-for="entry in entries" :key="entry.id" left-color="positive" right-color="negative"  @left="onLeft" @right="onEntrySlideRight($event, entry)">
          <!-- <template v-slot:left>
          <q-icon name="done" />
          </template> -->
          <template v-slot:right>
          <q-icon name="delete" />
          </template>
          <q-item >
           <q-item-section
           class="text-weight-bold"
           :class="useAmountColorClass(entry.amount)"
            >
            {{ entry.name }}
            </q-item-section>

            <q-item-section 
            class="text-weight-bold"
            :class="useAmountColorClass(entry.amount)"side>
            {{ useCurrencify(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>  
      </q-list>
    </div>
    <q-footer class="transparent">
     <div class="row q-px-md q-py-sm shadow-up-3">
     <div 
     class="col text-grey-7  text-h6">Balence</div>
     <div 
     :class="useAmountColorClass(balence)" 
     class="col  text-h6 text-right">{{ useCurrencify(balence) }}</div>
     </div>
     <q-form @submit="addEntry" class="row q-px-sm q-pv-sm q-col-gutter-sm bg-primary">
     <div class="col"><q-input ref="nameRef" v-model="addEntryFrom.name" placeholder="Name" outlined bg-color="white" dense/></div>
     <div class="col"><q-input v-model.number="addEntryFrom.amount" placeholder="Amount" type="number" step="0.01" outlined bg-color="white" dense/></div>
     <div class="col col-auto"><q-btn type="submit" round color="primary" icon="add" /></div>
     </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref , computed , reactive } from 'vue';
import { uid , useQuasar } from 'quasar';
import { useCurrencify } from 'src/use/useCurrencify';
import { useAmountColorClass } from 'src/use/useAmountColorClass';

// quasar
const $q = useQuasar();

const entries = ref([
  {
    id: 'id1',
    name: 'salary',
    amount: 5000.88,
  },
  {
    id: 'id2',
    name: 'phone',
    amount: -38999,
  },
  {
    id: 'id3',
    name: 'Unknown',
    amount: 0,
  },
]);

const balence = computed (() => {
  return entries.value.reduce((acc, {amount}) =>{
    return acc + amount;
  }, 0);

})

const nameRef = ref(null);

const addEntryFromDefault = {
  name: '',
  amount: null,
}


const addEntryFrom = reactive({
  ...addEntryFromDefault
})

const addEntryFromReset = () => {
 Object.assign(addEntryFrom, addEntryFromDefault);
 nameRef.value.focus()
}

const addEntry = () => {
  const newEntry = Object.assign({} , addEntryFrom, {id: uid()});
  entries.value.push(newEntry)
  addEntryFromReset();

}

// slide right delete 

const onEntrySlideRight = ({reset}, entry) => {

  $q.dialog({
        title: 'Delete Entry',
        message: `
        Delete this entry?
        <div class="q-mt-md text-weight-bold ${ useAmountColorClass(entry.amount)}">
          ${ entry.name } : - ${ useCurrencify(entry.amount) }
          </div>
        `,
        cancel: true,
        persistent: true,
        html: true,
        ok: {
          label: 'Delete',
          color: 'negative',
          noCaps: true
        },
        cancel: {
          label: 'Cancel',
          noCaps: true
        }
      }).onOk(() => {
         deleteEntry(entry.id);
      }).onCancel(() => {
         reset();
      })
}

const deleteEntry = entryID => {
  const index = entries.value.findIndex(entry => entry.id === entryID);
  entries.value.splice(index, 1);
  $q.notify({
    message:'Entry deleted..',
    position: 'top',
  })
}



</script>