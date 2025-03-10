<script setup></script>

<template>
  <div class="bg-white shadow-sm">
    <div class="p-4">
      <p>note content</p>
      <div class="text-sm text-gray-500 flex justify-between mt-4 items-center">
        <span>10-03-2025 @ 21:46</span>
        <span>7 characters</span>
      </div>
    </div>
    
    <div class="border-t border-gray-300 flex justify-center divide-x divide-gray-300">
      <RouterLink
        to=""
        class="w-full py-2 cursor-pointer hover:bg-[#1ea7f9] hover:text-white text-center"
      >Edit</RouterLink>
      <button class="w-full py-2 cursor-pointer hover:bg-red-600 hover:text-white">Delete</button>
    </div>
  </div>
</template>
