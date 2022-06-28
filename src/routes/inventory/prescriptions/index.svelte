<script lang="ts">
  import Icon from '../../../components/helpers/Icon.svelte';
</script>

<div class="card bg-neutral card-bordered">
  <div class="card-body text-neutral-content">
    <div class="card-title">
      Preescripciones médicas <Icon
        name="table"
        width="1.5em"
        height="1.5em"
        stroke="white"
        strokeWidth="1"
      />
    </div>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th />
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr>
            <th>1</th>
            <td>Acetaminofen</td>
            <td>20</td>
            <td class="text-sm text-gray-900 font-light whitespace-nowrap">
              <div class="flex items-center w-full bg-neutral rounded-xl">
                <div
                  class=" flex flex-auto tooltip tooltip-warning z-40"
                  data-tip="Editar"
                >
                  <button
                    class="flex flex-auto items-center justify-center py-4 hover:bg-warning rounded-xl text-neutral-content hover:text-warning-content"
                  >
                    <Icon
                      name="edit"
                      width="1.5em"
                      height="1.5em"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </button>
                </div>

                <div
                  class=" flex flex-auto tooltip tooltip-error z-40"
                  data-tip="Eliminar"
                >
                  <button
                    class="flex flex-auto items-center justify-center py-4 hover:bg-error rounded-xl text-neutral-content hover:text-error-content"
                  >
                    <Icon
                      name="trash-2"
                      width="1.5em"
                      height="1.5em"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <!-- row 2 -->
          <tr>
            <th>2</th>
            <td>Aspirina</td>
            <td>10</td>
            <td class="text-sm text-gray-900 font-light whitespace-nowrap">
              <div class="flex items-center w-full bg-neutral rounded-xl">
                <div
                  class=" flex flex-auto tooltip tooltip-warning z-40"
                  data-tip="Editar"
                >
                  <button
                    class="flex flex-auto items-center justify-center py-4 hover:bg-warning rounded-xl text-neutral-content hover:text-warning-content"
                  >
                    <Icon
                      name="edit"
                      width="1.5em"
                      height="1.5em"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </button>
                </div>

                <div
                  class=" flex flex-auto tooltip tooltip-error z-40"
                  data-tip="Eliminar"
                >
                  <button
                    class="flex flex-auto items-center justify-center py-4 hover:bg-error rounded-xl text-neutral-content hover:text-error-content"
                  >
                    <Icon
                      name="trash-2"
                      width="1.5em"
                      height="1.5em"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <!-- row 3 -->
          <tr>
            <th>3</th>
            <td>Guantes quirúrgicos</td>
            <td>4</td>
            <td class="text-sm text-gray-900 font-light whitespace-nowrap">
              <div class="flex items-center w-full bg-neutral rounded-xl">
                <div
                  class=" flex flex-auto tooltip tooltip-warning z-40"
                  data-tip="Editar"
                >
                  <button
                    class="flex flex-auto items-center justify-center py-4 hover:bg-warning rounded-xl text-neutral-content hover:text-warning-content"
                  >
                    <Icon
                      name="edit"
                      width="1.5em"
                      height="1.5em"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </button>
                </div>

                <div
                  class=" flex flex-auto tooltip tooltip-error z-40"
                  data-tip="Eliminar"
                >
                  <button
                    class="flex flex-auto items-center justify-center py-4 hover:bg-error rounded-xl text-neutral-content hover:text-error-content"
                  >
                    <Icon
                      name="trash-2"
                      width="1.5em"
                      height="1.5em"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
