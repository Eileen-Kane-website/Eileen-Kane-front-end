<template>
  <q-page-container class='bg-accent q-pt-lg'>
    <div class='bio-outer'>
      <div class='overlay q-pb-xl'>
        <div class='headline-box border bg-primary'>
          <h1 class='bio-headline text-accent text-center'>
            about the artist
          </h1>
        </div>
        <div class='bio-box border text-subtitle1 bg-primary text-dark q-pa-xl q-mb-xl'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris volutpat euismod leo vel pulvinar. Nulla libero libero, porttitor posuere dolor a, tempor accumsan libero. Suspendisse potenti. Morbi efficitur lorem sit amet lacus placerat, ac suscipit nisi porta. Vestibulum sed cursus ipsum. Donec et auctor mi, sed cursus lacus. Aliquam in libero posuere, finibus est sed, pharetra sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus, ex eu auctor ultricies, velit diam iaculis sapien, nec tempus mauris leo vitae quam. Proin porttitor nisl id varius dapibus. Suspendisse aliquam ligula in sollicitudin mattis. Donec vel tortor id mauris aliquet iaculis lacinia et ex. Vivamus pretium nulla eget justo maximus, at aliquet libero semper. Curabitur sit amet euismod augue.

            Nullam cursus venenatis felis, ac faucibus risus maximus sit amet. Nullam non mollis diam. Vestibulum fermentum, augue sed eleifend consequat, velit lorem semper dolor, eget finibus nunc odio sed urna. In ac dictum neque. Phasellus tempor maximus dapibus. Duis sagittis convallis facilisis. In turpis justo, aliquam at mauris sit amet, accumsan posuere ipsum. Vestibulum ac pulvinar ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi dolor erat, cursus non ante nec, efficitur aliquam dui. Etiam eget nisl et lorem tristique blandit. Duis felis nibh, volutpat quis gravida ut, gravida a dui. Sed vel diam quam.

            Nullam viverra velit congue lorem semper, et feugiat risus sollicitudin. Duis pretium erat sit amet magna luctus, non tempus tellus vulputate. Mauris fringilla, sem sit amet pharetra ornare, arcu ligula posuere lacus, a scelerisque odio leo in libero. Pellentesque dui tellus, tristique in mattis sed, tempus sed felis. Donec pretium magna nunc, condimentum viverra odio ullamcorper eget. Aenean eleifend, risus sed tincidunt pellentesque, arcu nibh tempor sapien, vitae pulvinar leo leo ac libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi pretium cursus neque eget laoreet. Nunc imperdiet mauris quis tellus consequat gravida. Nullam ligula elit, ultrices id diam volutpat, mollis elementum nibh. Fusce dignissim volutpat risus, eu fringilla turpis finibus sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed sed metus in magna maximus gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

            Nulla porttitor finibus massa, ac porta sem rutrum id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque sit amet eros blandit, vestibulum mi dapibus, suscipit massa. Aenean mauris lorem, euismod id enim a, tincidunt mattis dolor. Suspendisse a ullamcorper odio, in ultricies nibh. Quisque finibus volutpat diam, in vulputate mi rutrum nec. Praesent vel lectus lobortis, tempus ante id, fermentum ex. Curabitur quis quam eget erat blandit tristique sit amet sed tellus. Nam ut aliquet ipsum. Etiam eget ullamcorper nulla. Proin facilisis arcu libero, at lacinia ex sodales congue. Maecenas ornare rhoncus diam ut lacinia. Nunc convallis neque vitae sapien facilisis imperdiet. Etiam non quam interdum, porta nisl sed, finibus ante. Mauris at fringilla est. Duis in eros pulvinar, semper dolor in, suscipit sem.
          </p>
        </div>
      </div>
    </div>
  </q-page-container>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'src/store';

export default defineComponent ({
setup() {
  const store = useStore();
  
  onMounted(() => {
    void store.dispatch('header/setShowSeriesSelect', false)
    void store.dispatch('portfolio/resetSelectedSeries')
  })
}
})
</script>

<style lang='scss'>
  .bio-outer {
    width: 100vw;
    background-image: url('~assets/Protest-i.jpeg');
    background-repeat: no-repeat;
    background-size: 120%;
  }
  .overlay {
    background: rgba(29, 53, 87, .4);
    padding: 5rem 0 7rem 0;
    height: 100%;
  }
  .headline-box {
    width: 35%;
    height: 130px;
    margin: 2rem 0 3rem 3rem;
  }
  .bio-headline {
    font-family: 'Waterfall';
    font-size: 9rem;
    text-shadow: $secondary 2px 2px;
    margin-top: 0px;
  }
  .bio-box {
    width: 60%;
    margin-left: 35%;
  }
  .border {
    border: solid $dark 1px;
    border-radius: 10px;
  }
</style>
