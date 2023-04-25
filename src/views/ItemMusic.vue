<!-- 推荐歌单详情页面 -->
<template>
    <ItemMusicTop :playlist="state.playlist"/>
    <!-- 传入歌曲列表数据以及歌单列表的收藏量数据 -->
    <ItemMusicList :itemlist="state.itemlist" :subscribedCount="state.playlist.subscribedCount"/>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { getMusicItemList ,getItemList} from '@/request/api/item'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue';
import ItemMusicList from '@/components/item/ItemMusicList.vue';


export default {
    name: 'ItemMusic',
    setup() {
        const state = reactive({
            playlist: {},  //歌单详情页的数据
            itemlist:[]  //歌单的歌曲列表数据
        })
        onMounted(async () => {
            let id = useRoute().query.id
            // console.log(id);
            //获取歌单详情页
            let res = await getMusicItemList(id)
            // console.log(res);
            state.playlist = res.data.playlist

            //获取歌单歌曲列表
            let result = await getItemList(id)
            // console.log(result);
            state.itemlist= result.data.songs
            // console.log(state);
            
            //防止页面刷新，数据丢失，将数据保存到sessionStorage里面
            sessionStorage.setItem('itemDetail',JSON.stringify(state))
        })
        return { state }
    },
    components: {
        ItemMusicTop,
        ItemMusicList
    }
}
</script>

<style>

</style>