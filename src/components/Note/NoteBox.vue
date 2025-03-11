<script setup>
import { vAutofocus } from '@/directives/vAutofocus'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  actionBtnLabel: {
    type: String
  },
  cancelBtnLabel: {
    type: String
  },
  boxLabel: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue', 'handleAction'])

const textareRef = ref(null)
const focusTextArea = () =>  {
  textareRef.value.focus()
}
defineExpose({focusTextArea})

const isDisabled = computed(() => !props.modelValue?.trim())
</script>

<template>
  <div class="bg-sky-700 p-3">
    <label v-if="boxLabel" class="text-white text-sm">{{ boxLabel }}</label>
    <textarea
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      v-autofocus
      ref="textareRef"
      class="bg-white w-full block p-2 text-gray-700 mb-4"
      :placeholder="placeholder"
      rows="4"
      maxlength="100"
    ></textarea>
    <div class="flex justify-between">
      <RouterLink v-if="cancelBtnLabel" class="btn" to="/">{{ cancelBtnLabel }}</RouterLink>
      <button
        v-if="actionBtnLabel"
        @click="$emit('handleAction')"
        :disabled="isDisabled"
        :class="['btn', { 'btn-disabled': isDisabled }]"
      >{{ actionBtnLabel }}</button>
    </div>
  </div>
</template>
