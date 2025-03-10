import { onMounted, onBeforeUnmount } from 'vue';

export function useOnClickOutside(callback) {
  const onClickOutside = event => {
    callback(event)
  };
  
  onMounted(() => {
    document.addEventListener('click', onClickOutside) // Listen to clicks anywhere
  })
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside) // Clean up listener
  })
}
