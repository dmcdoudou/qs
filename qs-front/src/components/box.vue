<template lang="html">
    <div class="container">
        <div class="header">
            <p>{{ title }}</p>
        </div>
        <div class="content">
            <slot>
                no content
            </slot>
        </div>
    </div>
</template>


<script lang="babel">
    export default {
      name: 'box',
      data() {
        return {
        }
      },
      props: {
        title: {
          type: String,
          default: 'no title'
        }
      }
    }
</script>

<style lang="less" scoped>
    .container {
        width: 50%;
        margin: 0 auto;
    }
    .header {
        height: 50px;
        line-height: 50px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: #f6f6f6;
        border-bottom: 2px solid #eeeeee;
        padding: 0 30px;
        p {
            font-size: 20px;
        }
    }
    .content {
        border: 1px solid #eeeeee;
        border-top: none;
        padding: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
</style>