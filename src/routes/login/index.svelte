<script context="module">
  import { variables } from '../../variables';
  import {getFormData} from '../../hooks/utils';
  import Cookies from 'js-cookie'
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '../../components/helpers/Icon.svelte';
  let data = {
    identifier: '',
    password: '',
  };
  let result = null
	console.log("Token cookie: " + Cookies.get('token'));
	async function doPost () {
    var formData = getFormData(data);
		const res = await fetch(`${variables.apiUri}/auth/signin`, {
			method: 'POST',
			body: formData,
		})
		
		const json = await res.json()
		result = JSON.stringify(json)
    console.log(result);
    console.log(json.token);
    Cookies.set('token', "Bearer "+json.token)
    if (json.token) {
      goto('/')
    }
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
  <img  style="border:20px;margin:50px;float:left;width:500px;height: 500px;" class="object-cover" src="https://pbs.twimg.com/media/EbOTrZVWoAEzl_t.jpg:large">
   <hr>

  <div class="max-w-md w-full space-y-8">

    <div>

      <img class="mx-auto h-12 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Logo_ISSS.svg/1862px-Logo_ISSS.svg.png" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        Bienvenido al sistema de citas de ISSS
      </h2>
    </div>
    <form class="mt-8 space-y-6">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input bind:value="{data.identifier}" id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
        <input bind:value="{data.password}" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password">
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-sm">
          <a href="/login/forgot" class="font-medium text-blue-600 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <a on:click={doPost} id="signin" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-lightblue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-50" aria-required="true">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: lock-closed -->
            <svg class="h-5 w-5 text-blue-50 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Login
        </a>
      </div>
    </form>
  </div>
</div>