<!--suppress RequiredAttributes -->
<template>
  <div class="app-crud-grid" :class="{'--grid-filtering': filter.active}">

    <app-grid-toolbar v-if="top"
                      v-bind="{handler, direction, page, pages, limit, total, paginate, buttons: buttons.top}"
                      @change-page="changePage" @change-limit="changeLimit"/>
    <hr v-if="top">

    <app-data-table ref="grid"
                    v-bind="{columns, data, debug, position, slots, styles, bodyStyle, actions: buttons.middle}"/>

    <hr v-if="bottom">

    <app-grid-toolbar v-if="bottom"
                      v-bind="{handler, direction, page, pages, limit, total, paginate, buttons: buttons.bottom}"
                      @change-page="changePage" @change-limit="changeLimit"/>

    <div class="fixed-bottom-right" v-if="floating">
      <app-button-bar v-bind="{handler, buttons: buttons.floating}"/>
    </div>

    <q-modal ref="filter" position="right" :content-css="filter.css">
      <app-grid-filter v-if="search" :filters="filter.columns" :record="filter.record"
                       @close="filterClose" @apply="filterApply" @clear="filterClear"/>
    </q-modal>

    <template v-if="debugging">
      <app-debugger v-bind="{label: 'data', inspect: data}"/>
      <app-debugger v-bind="{label: 'columns', inspect: columns}"/>
      <app-debugger v-bind="{label: 'filter', inspect: filter.record}"/>
    </template>
  </div>
</template>

<script type="text/javascript">
  import AppDataTable from 'src/themes/phpzm/components/data-table/AppDataTable.vue'
  import AppButtonBar from 'src/themes/phpzm/components/button/AppButtonBar.vue'
  import AppDebugger from 'src/themes/phpzm/components/debugger/AppDebugger.vue'
  import AppGridFilter from 'src/themes/phpzm/components/crud/components/grid/AppGridFilter'
  import AppGridToolbar from 'src/themes/phpzm/components/crud/components/grid/AppGridToolbar.vue'
  import { MixinComputed, MixinData, MixinMethods, MixinProps } from './model'
  import { MixinGrid, MixinFilter } from './model/grid'

  /**
   * @type {Object}
   * @property data
   * @property pages
   * @property total
   */
  const AppCrudGrid = {
    components: {
      AppDataTable, AppButtonBar, AppGridToolbar, AppGridFilter, AppDebugger
    },
    mixins: [
      MixinComputed, MixinData, MixinMethods, MixinProps, MixinGrid, MixinFilter
    ],
    name: 'app-crud-grid'
  }
  export default AppCrudGrid
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app-crud-grid
    padding 16px 0 0 0
    &.--grid-filtering
      .--button-filter
        background darkred !important
        i
          color white !important
    hr
      margin 10px 0
    .fixed-bottom-right
      margin 5px
</style>
