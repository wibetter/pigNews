<!--
 * @Description: 滚动资讯
 * @Author: wibetter
 -->
<template>
  <div class="news-page clearfix" id="newsPageWrapper">
    <JSONEditorForm
      viewStyle="tabs"
      :schemaData="jsonSchema"
      :jsonData="jsonData"
      :options="options"
    />
    <div class="newsList" id="newsBox">
      <template v-for="item in newsList">
        <div class="news-item" :key="item._id">
          <div class="item-con">
            <div class="news-title">{{ item.title }}</div>
            <div class="news-info">
              <div class="left media-mark">{{ item.source || '小猪新闻' }}</div>
              <div
                v-if="item.comment && item.comment != 0"
                class="cmt-num right"
              >
                {{ agreeDataFormat(item.comment) }}评
              </div>
            </div>
          </div>
          <div class="item-imgbox">
            <div
              v-if="
                item.allPics &&
                item.allPics.pics &&
                item.allPics.pics[0] &&
                item.allPics.pics[0].imgurl
              "
              class="news-img"
              :style="{
                backgroundImage: 'url(' + item.allPics.pics[0].imgurl + ')',
              }"
            ></div>
          </div>
        </div>
      </template>
      <div class="loadRecommend" v-if="isLoad">
        <img class="loadding-img" src="#assetsPublicPath#/img/loadding.gif" />
        正在加载中
      </div>
      <div class="moreRecommend" v-else @click="onClickBottom">
        {{ tipText }}
      </div>
    </div>
    <FooterView :pageKey="'news'" />
  </div>
</template>
<script>
// import Vue from 'vue';
// import { VuePlugin } from 'vuera';
// Vue.use(VuePlugin);
import FooterView from '$components/index/footerView';
import scrollToBottom from '$utils/scrollToBottom';
import { ReactInVue } from 'vuera';
import JSONEditor from '@wibetter/json-editor';
import '@wibetter/json-editor/lib/index.css';

/* 引进项目配置文件 */
import APIList from '$config/APIList';

// 测试用
const jsonSchema = {
  type: 'object',
  name: 'TPLSearch',
  title: '头部组件',
  properties: {
    props: {
      type: 'object',
      title: '属性',
      isFixed: true,
      properties: {
        name: {
          title: '组件名称',
          type: 'input',
          default: 'x',
          description: '',
          placeholder: '',
        },
        description: {
          title: '组件描述',
          type: 'input',
          default: 'x',
          description: '组件的描述，该值会外显至mp后台',
          placeholder: '',
        },
        renderMethod: {
          title: '渲染方式',
          type: 'radio',
          description:
            '组件的渲染方式，支持客户端和服务端。首屏内容选择服务端，非首屏内容选择客户端',
          options: [
            {
              label: '客户端',
              value: 'client',
            },
            {
              label: '服务端',
              value: 'server',
            },
          ],
          default: 'client',
        },
        firstChannel1: {
          type: 'dynamic-config',
          title: '动态配置',
          description: '',
          isContainer: false,
          properties: {
            type: {
              type: 'select',
              title: '数据来源',
              options: [
                {
                  label: '模板直接设置',
                  value: 'DevDefaults',
                },
                {
                  label: 'mp后台配置',
                  value: 'ContentStaticConfig',
                },
                {
                  label: '内容Meta数据',
                  value: 'Content',
                },
                {
                  label: '全局配置数据',
                  value: 'RuntimeConst',
                },
                {
                  label: '资源中心配置',
                  value: 'ResourceCenter',
                },
              ],
              default: 'DevDefaults',
              isConditionProp: true,
              description:
                '目前支持的数据来源包括： 1)模版直接设置:在模版配置直接生效，支持直接输入或图片上传。 2)mp后台配置:选择mp后台配置后，属性会出现在mp后台中，支持属性描述的输入。 3)内容meta数据:支持内容meta数据的获取，页面meta数据。 4)全局配置数据:目前支持的全局配置包括：全局Tab配置及主题包配置。相关属性会挂载至：window.globalConst',
            },
            value: {
              title: '数据值',
              type: 'input',
              default: '',
              description: '',
              placeholder: '',
            },
            description: {
              title: '属性名称',
              type: 'input',
              default: '',
              description: '',
              placeholder: '',
            },
            valueType: {
              type: 'radio',
              title: '配置方式',
              options: [
                {
                  label: '填写',
                  value: 'string',
                },
                {
                  label: '选择',
                  value: 'select',
                },
              ],
              default: 'string',
              isConditionProp: true,
              description: '',
            },
            range: {
              type: 'select',
              title: '可选项',
              multiple: true,
              options: [],
              description: '这里会使用value中的配置选项作为options',
            },
          },
          propertyOrder: ['type', 'value', 'description', 'valueType', 'range'],
          showCodeViewBtn: false,
        },
        firstChannel: {
          type: 'object',
          title: '一级标题',
          description: '',
          isContainer: false,
          properties: {
            type: {
              type: 'select',
              title: '数据来源',
              options: [
                {
                  label: '模板直接设置',
                  value: 'DevDefaults',
                },
                {
                  label: 'mp后台配置',
                  value: 'ContentStaticConfig',
                },
                {
                  label: '内容Meta数据',
                  value: 'Content',
                },
                {
                  label: '全局配置数据',
                  value: 'RuntimeConst',
                },
                {
                  label: '资源中心配置',
                  value: 'ResourceCenter',
                },
              ],
              default: 'DevDefaults',
              isConditionProp: true,
              description:
                '目前支持的数据来源包括： 1)模版直接设置:在模版配置直接生效，支持直接输入或图片上传。 2)mp后台配置:选择mp后台配置后，属性会出现在mp后台中，支持属性描述的输入。 3)内容meta数据:支持内容meta数据的获取，页面meta数据。 4)全局配置数据:目前支持的全局配置包括：全局Tab配置及主题包配置。相关属性会挂载至：window.globalConst',
            },
            value: {
              title: '数据值',
              type: 'input',
              default: '',
              description: '',
              placeholder: '',
            },
            description: {
              title: '属性名称',
              type: 'input',
              default: '',
              description: '',
              placeholder: '',
            },
            valueType: {
              type: 'radio',
              title: '配置方式',
              options: [
                {
                  label: '填写',
                  value: 'string',
                },
                {
                  label: '选择',
                  value: 'select',
                },
              ],
              default: 'string',
              isConditionProp: true,
              description: '',
            },
            range: {
              type: 'select',
              title: '可选项',
              multiple: true,
              options: [],
              description: '这里会使用value中的配置选项作为options',
            },
          },
          propertyOrder: ['type', 'value', 'description', 'valueType', 'range'],
          showCodeViewBtn: false,
        },
      },
      propertyOrder: [
        'name',
        'description',
        'renderMethod',
        'firstChannel1',
        'firstChannel',
      ],
    },
    style: {
      type: 'object',
      title: '样式',
      isFixed: true,
      properties: {
        margin: {
          type: 'box-style',
          title: '外边距',
          isContainer: false,
          properties: {
            unit: {
              type: 'string',
              title: '单位数值',
              default: '15px',
              description: '',
            },
            quantity: {
              type: 'select',
              default: 'px',
              options: [
                {
                  label: 'px',
                  value: 'px',
                },
                {
                  label: 'rem',
                  value: 'rem',
                },
                {
                  label: 'em',
                  value: 'em',
                },
                {
                  label: '%',
                  value: '%',
                },
              ],
              title: '单位类型',
            },
          },
          propertyOrder: ['unit', 'quantity'],
        },
        width: {
          type: 'quantity',
          title: '宽',
          isContainer: false,
          properties: {
            unit: {
              type: 'number',
              title: '单位数值',
              default: 220,
              minimum: 0,
              maximum: '10000',
              description: '',
            },
            quantity: {
              type: 'select',
              default: 'px',
              options: [
                {
                  label: 'px',
                  value: 'px',
                },
                {
                  label: 'rem',
                  value: 'rem',
                },
                {
                  label: 'em',
                  value: 'em',
                },
                {
                  label: '%',
                  value: '%',
                },
              ],
              title: '单位类型',
            },
          },
          propertyOrder: ['unit', 'quantity'],
        },
        padding: {
          type: 'box-style',
          title: '内边距',
          isContainer: false,
          properties: {
            unit: {
              type: 'string',
              title: '单位数值',
              default: '15px',
              description: '',
            },
            quantity: {
              type: 'select',
              default: 'px',
              options: [
                {
                  label: 'px',
                  value: 'px',
                },
                {
                  label: 'rem',
                  value: 'rem',
                },
                {
                  label: 'em',
                  value: 'em',
                },
                {
                  label: '%',
                  value: '%',
                },
              ],
              title: '单位类型',
            },
          },
          propertyOrder: ['unit', 'quantity'],
        },
        padding2: {
          title: '内边距',
          type: 'select',
          options: [
            {
              label: '无间距',
              value: '',
            },
            {
              label: '上下左右（间距-4,8px）',
              value: '$Spacing-4,$Spacing-4,$Spacing-4,$Spacing-4',
            },
            {
              label: '上下左右（间距-8,20px）',
              value: '$Spacing-8,$Spacing-8,$Spacing-8,$Spacing-8',
            },
            {
              label: '上（间距-8,20px）',
              value: '$Spacing-8,0,0,0',
            },
            {
              label: '上（间距-12,40x）',
              value: '$Spacing-12,0,0,0',
            },
            {
              label: '上（间距-13,48px）',
              value: '$Spacing-13,0,0,0',
            },
            {
              label: '右（间距-15,60px）',
              value: '0,$Spacing-15,0,0',
            },
            {
              label: '右（间距-18,80px）',
              value: '0,$Spacing-18,0,0',
            },
            {
              label: '下（间距-12,40px）',
              value: '0,0,$Spacing-12,0',
            },
            {
              label: '左（间距-15,60）',
              value: '0,0,0,$Spacing-15',
            },
          ],
        },
        margin2: {
          title: '外边距',
          type: 'select',
          options: [
            {
              label: '无间距',
              value: '',
            },
            {
              label: '上下0，左右居中',
              value: '0,auto,0,auto',
            },
            {
              label: '上下左右（间距-8,20px） 20px',
              value: '$Spacing-8,$Spacing-8,$Spacing-8,$Spacing-8',
            },
            {
              label: '上（间距-12,40px）',
              value: '$Spacing-12,0,0,0',
            },
            {
              label: '上（间距-13,48px）',
              value: '$Spacing-13,0,0,0',
            },
            {
              label: '右（间距-15,60px）',
              value: '0,$Spacing-15,0,0',
            },
            {
              label: '右（间距-18,80px）',
              value: '0,$Spacing-18,0,0',
            },
            {
              label: '下（间距-12,40px）',
              value: '0,0,$Spacing-12,0',
            },
            {
              label: '左（间距-15,60px）',
              value: '0,0,0,$Spacing-15',
            },
          ],
        },
        mianAlignment: {
          title: '主轴对齐',
          type: 'select',
          options: [
            {
              label: '无',
              value: '',
            },
            {
              label: '起始位置开始排列',
              value: 'start',
            },
            {
              label: '结束位置开始排列',
              value: 'end',
            },
            {
              label: '居中对齐',
              value: 'center',
            },
            {
              label: '拉伸以适应容器的尺寸',
              value: 'stretch',
            },
            {
              label: '以基线对齐',
              value: 'baseline',
            },
          ],
          default: 'start',
        },
        crossAlignment: {
          title: '交叉轴对齐',
          type: 'select',
          options: [
            {
              label: '无',
              value: '',
            },
            {
              label: '起始位置开始排列',
              value: 'start',
            },
            {
              label: '结束位置开始排列',
              value: 'end',
            },
            {
              label: '居中对齐',
              value: 'center',
            },
            {
              label: '均匀分布，首尾不留白',
              value: 'space-between',
            },
            {
              label: '均匀分布，两侧间隔相等',
              value: 'space-around',
            },
          ],
          default: 'start',
        },
      },
      propertyOrder: [
        'width',
        'margin',
        'padding',
        'margin2',
        'padding2',
        'mianAlignment',
        'crossAlignment',
      ],
    },
    data: {
      type: 'object',
      title: '数据',
      isFixed: true,
      properties: {
        sohuDataSource: {
          type: 'sohu-source',
          title: '组件动态数据',
          description: '',
          isContainer: false,
          properties: {
            mainConfig: {
              type: 'object',
              title: '主要配置',
              description: '',
              isContainer: false,
              properties: {
                type: {
                  type: 'select',
                  title: '数据来源',
                  isConditionProp: true,
                  options: [
                    {
                      label: '模板直接配置',
                      value: 'RuntimeDataSelfDefine',
                    },
                    {
                      label: 'mp后台配置',
                      value: 'ContentStaticConfig',
                    },
                    {
                      label: '请求当前页面数据',
                      value: 'RuntimeDataSelfContent',
                    },
                    {
                      label: '资源中心配置',
                      value: 'ResourceCenter',
                    },
                  ],
                  default: 'ContentStaticConfig',
                  description: '',
                },
                description: {
                  title: '数据源名称',
                  type: 'input',
                  default: '',
                  description: '',
                  placeholder: '',
                },
                dataType: {
                  type: 'radio',
                  title: '请求方式',
                  options: [
                    {
                      label: '批量请求',
                      value: 'FROMCIS',
                    },
                    {
                      label: '组件内部请求',
                      value: 'FROMCOMPCIS',
                    },
                    {
                      label: '不请求',
                      value: 'false',
                    },
                  ],
                  description: '',
                },
                CONTENTID: {
                  title: '数据源ID',
                  type: 'input',
                  default: '',
                  description: '',
                  placeholder: '',
                },
                CONTENTTYPE: {
                  type: 'select',
                  title: '数据源类型',
                  options: [
                    {
                      label: 'channle',
                      value: 'channle',
                    },
                    {
                      label: 'topic',
                      value: 'topic',
                    },
                    {
                      label: 'block',
                      value: 'block',
                    },
                  ],
                  description: '',
                },
              },
              propertyOrder: [
                'type',
                'description',
                'dataType',
                'CONTENTID',
                'CONTENTTYPE',
              ],
              showCodeViewBtn: false,
            },
            outConfig: {
              type: 'object',
              title: '出流配置',
              description: '',
              isContainer: false,
              properties: {
                PRO: {
                  type: 'select',
                  title: '内容类型',
                  options: [
                    {
                      label: '置顶+加精',
                      value: '4',
                    },
                    {
                      label: '长效置顶',
                      value: '5',
                    },
                  ],
                  description: '',
                },
                FEEDTYPE: {
                  type: 'select',
                  title: '排序类型',
                  options: [
                    {
                      label: '综合',
                      value: 'XTOPIC_SYNTHETICAL',
                    },
                    {
                      label: '最新',
                      value: 'XTOPIC_LATEST',
                    },
                    {
                      label: '相关',
                      value: 'XTOPIC_RELATED',
                    },
                  ],
                  description: '',
                },
                VIEW: {
                  type: 'select',
                  title: '数据裁剪',
                  options: [
                    {
                      label: '相关推荐模式',
                      value: 'articleFeedMode',
                    },
                    {
                      label: '文字链裁剪方式',
                      value: 'textMode',
                    },
                    {
                      label: '短内容摘录方式',
                      value: 'excerptMode',
                    },
                    {
                      label: '互动（点赞/评论）裁剪方式',
                      value: 'interactMode',
                    },
                    {
                      label: '评论文字链裁剪方式',
                      value: 'commentTextMode',
                    },
                    {
                      label: '摘录方式（无点赞）',
                      value: 'excerptCommentMode',
                    },
                    {
                      label: '无限流卡片模式',
                      value: 'dynamicFeedMode',
                    },
                    {
                      label: '时间线模式',
                      value: 'timeLineMode',
                    },
                    {
                      label: '复合内容流模式',
                      value: 'multiFeedMode',
                    },
                    {
                      label: '搜狐号推荐模式',
                      value: 'recommendFeedMode',
                    },
                    {
                      label: '作者页内容流模式',
                      value: 'operateFeedMode',
                    },
                    {
                      label: '标签内容流模式',
                      value: 'tagsFeedMode',
                    },
                    {
                      label: '评论链裁剪方式',
                      value: 'commentMode',
                    },
                    {
                      label: '标签摘录方式',
                      value: 'excerptTagsMode',
                    },
                    {
                      label: '内容流模式',
                      value: 'feedMode',
                    },
                  ],
                  description: '',
                },
                CONTENTCONTEXT: {
                  type: 'select',
                  title: 'mKey参数',
                  options: [
                    {
                      label: '作者ID+栏目ID',
                      value: 'authorColumnId_${#authorColumnId}',
                    },
                    {
                      label: '账号ID',
                      value: 'accountId_${#contentData_account_id}',
                    },
                    {
                      label: 'mkeyID',
                      value: 'mid_${#mkeyConst_mid}',
                    },
                    {
                      label: 'mkey名称',
                      value: 'mname_${#mkeyConst_mname}',
                    },
                    {
                      label: '城市Code码',
                      value: 'cityCode_${#cityInfo_cityCode}',
                    },
                    {
                      label: '城市名称',
                      value: 'cityName_${#cityInfo_cityName}',
                    },
                    {
                      label: '焦点城市Code码',
                      value: 'focusCityCode_${#focusCityInfo_cityCode}',
                    },
                  ],
                  description: '',
                },
                CONTENTPARAMS: {
                  title: '动态参数',
                  type: 'json',
                  default: '{}',
                  description: '请填写JSON格式的参数',
                  placeholder: '',
                },
              },
              propertyOrder: [
                'PRO',
                'FEEDTYPE',
                'VIEW',
                'CONTENTCONTEXT',
                'CONTENTPARAMS',
              ],
              showCodeViewBtn: false,
            },
            otherConfig: {
              type: 'object',
              title: '选配内容',
              description: '',
              isContainer: false,
              properties: {
                SIZE: {
                  type: 'number',
                  title: '容量',
                  default: 1,
                  minimum: 0,
                  maximum: 1000,
                  description: '',
                },
                TITLE: {
                  title: '标题',
                  type: 'input',
                  default: '',
                  description: '',
                  placeholder: '',
                },
                CODE: {
                  title: 'Code参数',
                  type: 'input',
                  default: '',
                  description: '',
                  placeholder: '',
                },
                URL: {
                  type: 'url',
                  title: '跳转链接',
                  default: '',
                  description: '',
                  placeholder: '',
                },
              },
              propertyOrder: ['SIZE', 'TITLE', 'URL', 'CODE'],
              showCodeViewBtn: false,
            },
          },
          propertyOrder: ['mainConfig', 'otherConfig', 'outConfig'],
          showCodeViewBtn: false,
        },
      },
      propertyOrder: ['sohuDataSource'],
    },
    event: {
      type: 'object',
      title: '事件',
      isFixed: true,
      properties: {
        sohuEvent: {
          type: 'sohu-event',
          title: 'sohu组件事件',
          showCodeViewBtn: false,
          isContainer: false,
          properties: {
            globalEventMap: {
              type: 'object',
              title: '全局事件Map',
              description: '',
              properties: {},
              propertyOrder: [],
              showCodeViewBtn: false,
            },
            event: {
              type: 'array',
              title: '监听事件',
              description: '当前组件监听事件列表',
              default: [],
              items: {
                type: 'object',
                title: '数组项',
                description: '',
                properties: {
                  name: {
                    type: 'input',
                    title: '事件',
                    default: '',
                    description: '',
                    placeholder: '',
                  },
                  code: {
                    title: '事件code',
                    type: 'input',
                    default: '',
                    description: '',
                    placeholder: '',
                  },
                  listenName: {
                    title: '事件名称',
                    type: 'input',
                    default: '',
                    description: '',
                    placeholder: '',
                  },
                  desc: {
                    title: '事件描述',
                    type: 'input',
                    default: '',
                    description: '',
                    placeholder: '',
                  },
                },
                propertyOrder: ['name', 'code', 'listenName', 'desc'],
              },
              showCodeViewBtn: false,
            },
          },
          propertyOrder: ['globalEventMap', 'event'],
        },
      },
      propertyOrder: ['sohuEvent'],
    },
  },
  propertyOrder: ['props', 'data', 'style', 'event'],
  lastUpdateTime: '2024-12-16T09:11:14.153Z',
};
const jsonData = {
  event: {
    sohuEvent: {
      event: [
        {
          name: 'changeTab',
          listenName: 'TPLTabMenu_1720691304950_tabChange',
        },
      ],
      globalEventMap: {
        TPLTabMenu_1720691304950_tabChange: 'TabMenu菜单切换',
        TPLTabMenu_1720691304952_tabChange: 'TabMenu菜单切换2',
        CompTest1_1720691304953_click: '自定义点击事件',
      },
    },
  },
};
const options = {
  widgetType: 'page', // 组件类型 comp / page
  eventListenConfig: [
    {
      name: 'changeTab',
      desc: 'TabMenu菜单切换',
      code: 'TPLTabMenu_1720691304950_tabChange',
      listenName: 'TPLTabMenu_1720691304950',
    },
  ],
  eventEmitConfig: [
    {
      name: 'click',
      desc: '点击事件',
      code: 'CompTest1_1720691304953_click',
      compCode: 'CompTest1_1720691304953',
    },
  ], // 组件触发事件
  allEmitEventList: [
    {
      name: 'changeTab',
      desc: 'TabMenu菜单切换',
      code: 'TPLTabMenu_1720691304950_tabChange',
      compCode: 'TPLTabMenu_1720691304950',
    },
    {
      name: 'changeTab',
      desc: 'TabMenu菜单切换2',
      code: 'TPLTabMenu_1720691304952_tabChange',
      compCode: 'TPLTabMenu_1720691304952',
    },
    {
      name: 'click',
      desc: '点击事件',
      code: 'CompTest1_1720691304953_click',
      compCode: 'CompTest1_1720691304953',
    },
  ], // 全局可用事件列表
  metaContentKeyList: [
    {
      label: '全部内容',
      value: 'ALLCONTENT',
    },
    {
      label: 'title',
      value: 'title',
    },
    {
      label: 'id',
      value: 'id',
    },
    {
      label: 'newsMeta',
      value: 'newsMeta',
    },
  ],
  globalMetaConfig: [],
};

export default {
  data() {
    return {
      newsList: [],
      idList: [],
      tipText: '上划或点击查看更多',
      isLoad: false,
      isFirstVisit: true,
      isAlive: true,
      scrollHelper: {},
      page: 1,
      page_size: 10,
      params: {
        col: '40750',
        level: '',
        act: 'more',
      },
    };
  },
  components: {
    FooterView,
    JSONEditorForm: ReactInVue(JSONEditor),
  },
  computed: {
    jsonSchema() {
      return jsonSchema;
    },
    options() {
      return options;
    },
    jsonData() {
      return jsonData;
    },
  },
  created() {
    this.getNews();
  },
  mounted() {
    this.isFirstVisit = false;
    // 滚动到底部自动加载更多
    this.scrollHelper = scrollToBottom({
      container: window,
      target: '#newsBox',
      triggerDistance: 100,
      callBack: this.getMoreNews,
      time: 30,
    });
    this.scrollHelper.start();
  },
  activated() {
    this.isAlive = true;
    this.scrollHelper.start();
  },
  deactivated() {
    this.isAlive = false;
    this.scrollHelper.stop();
  },
  methods: {
    onReachBottom() {
      // 页面上拉触底事件的处理函数
      this.getMoreNews();
    },
    onClickBottom() {
      // 底部查看更多点击事件的处理函数
      this.getMoreNews();
    },
    getMoreNews() {
      if (this.isAlive) {
        this.page += 1;
        this.getNews();
      }
    },
    getNews() {
      if (this.isLoad) return;
      this.isLoad = true;
      const currentTime = new Date().getTime();
      const _this = this;
      // eslint-disable-next-line
      const $ = window.$ || window.jQuery;
      $.ajax({
        url: APIList.newsData,
        data: {
          show_num: _this.page_size,
          page: _this.page,
          jsoncallback: `callbackFunction_${currentTime}`,
          ...this.params,
        },
        timeout: 10e3,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: `callbackFunction_${currentTime}`,
        success(response) {
          if (
            response &&
            response.result &&
            response.result.data &&
            response.result.data.list
          ) {
            const resultData = response.result.data.list;
            if (resultData.length !== 0) {
              // 去重
              for (let ind = 0, size = resultData.length; ind < size; ind++) {
                const newItem = resultData[ind];
                if (_this.idList.indexOf(newItem._id) < 0) {
                  _this.newsList.push(newItem);
                  _this.idList.push(newItem._id);
                }
              }
              // _this.newsList.push(...resultData);
              _this.newsList = Object.assign([], _this.newsList);
            } else {
              _this.tipText = '没有更多了哟';
            }
          }
          _this.isLoad = false;
        },
      });
    },
    agreeDataFormat(agreeData) {
      if (agreeData && agreeData <= 9999) {
        return agreeData;
      }
      if (agreeData && agreeData > 9999) {
        return `${Math.floor(agreeData / 1000) / 10}w`;
      }
    },
  },
};
</script>
<style lang="scss">
.news-page {
  position: relative;
  background-color: #fff;
  padding-bottom: px2rem(85);
  min-height: 100vh;
  box-sizing: border-box;

  .newsList {
    position: relative;
    padding: px2rem(28) 0;
    box-sizing: border-box;
  }

  .news-item {
    position: relative;
    margin: 0 px2rem(24) px2rem(28);
    padding: 0 0 px2rem(28) 0;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid #ececec;
  }

  .item-con {
    flex: 1 1 px2rem(436);
    padding-right: px2rem(20);
  }

  .news-title {
    font-family: PingFangSC-Regular;
    max-height: px2rem(96);
    font-size: px2rem(30);
    line-height: px2rem(48);
    height: px2rem(96);
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .news-info {
    font-family: PingFangSC-Light;
    height: px2rem(28);
    margin-top: px2rem(30);
    box-sizing: border-box;
  }

  .call-app-mark {
    display: inline-block;
    margin-right: px2rem(8);
    height: px2rem(28);
    padding: px2rem(3) px2rem(8);
    text-align: center;
    font-family: PingFangSC-Light;
    font-size: px2rem(20);
    color: #405d7f;
    border: 1px solid #405d7f;
    border-radius: px2rem(4);
    box-sizing: border-box;
  }
  .media-mark {
    display: inline-block;
    height: px2rem(28);
    font-family: PingFangSC-Light;
    font-size: px2rem(24);
    color: #828282;
  }

  .cmt-num,
  .picture-mark,
  .video-mark {
    display: inline-block;
    height: px2rem(28);
    font-family: PingFangSC-Light;
    font-size: px2rem(20);
    padding: px2rem(4) px2rem(8);
    text-align: center;
    box-sizing: border-box;
  }

  .cmt-num {
    height: px2rem(28);
    width: px2rem(90);
    margin-left: px2rem(7);
    color: #828282;
    background: url(#assetsPublicPath#/img/cmt-bk.svg) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .picture-mark,
  .video-mark {
    height: px2rem(28);
    width: px2rem(64);
    margin-left: px2rem(7);
    color: #fff;
    background: url(#assetsPublicPath#/img/img-sort-bk.svg) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-imgbox {
    flex: 0 0 px2rem(230);
    height: px2rem(154);
    text-align: center;
    overflow: hidden;
  }

  .item-imgbox .news-img {
    width: 100%;
    height: 100%;
    background-size: cover;
  }

  .moreRecommend,
  .loadRecommend {
    font-family: PingFangSC-Regular;
    font-size: px2rem(26);
    color: #405d7f;
    text-align: center;
    line-height: px2rem(35);
    height: px2rem(50);
    padding-bottom: px2rem(15);
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loadding-img {
    height: px2rem(35);
    width: px2rem(35);
    margin: 0 px2rem(8);
  }
}
</style>
