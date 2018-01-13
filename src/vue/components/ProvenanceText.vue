<!-- ###################   HTML   ################### -->
<template>
  <div class="provenance-text">
    I am Provenance Text
    and my data is
    <pre>{{}}</pre>
    <div class='navbar'> 
      <div class="navbar-menu is-active">
        <div class="navbar-end">
          <div class="navbar-item">
            <button class="button is-small">Reset</button>
          </div>
          <div class="navbar-item">
            <button class="button is-small">Copy Provenance</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>

export default {
  props: [],
  components: {
  }
}
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
  .provenance-text {
    margin-top: 1rem;
  }
</style>