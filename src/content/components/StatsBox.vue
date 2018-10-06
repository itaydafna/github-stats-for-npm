<template>
  <div id="stats-box-container">
    <div id="stats-box">
      <h2 
        v-if="!!repoData.name" 
        class="title">{{ repoData.name }}</h2>
      <table>
        <tbody>
          <tr v-if="!!repoData.stargazers_count">
            <td class="param-td">
              URL:
            </td>
            <td class="value-td">
              <a 
                :href="repoData.html_url" 
                target="_blank">{{ repoData.html_url }}</a>
            </td>
          </tr>
          <tr v-if="!!repoData.stargazers_count">
            <td class="param-td">
              Stars:
            </td>
            <td class="value-td">
              <IconedCounter 
                :counter-val="repoData.stargazers_count">
                <Octicon name="star"/>
              </IconedCounter>
            </td>
          </tr>
          <tr v-if="!!repoData.subscribers_count">
            <td class="param-td">
              Subscribers:
            </td>
            <td class="value-td">
              <IconedCounter 
                :counter-val="repoData.subscribers_count">
                <Octicon name="eye"/>
              </IconedCounter>
            </td>
          </tr>
          <tr v-if="!!repoData.forks">
            <td class="param-td">
              Forks:
            </td>
            <td class="value-td">
              {{ repoData.forks | addCommas }}
            </td>
          </tr>
          <tr v-if="!!repoData.watchers">
            <td class="param-td">
              Watchers:
            </td>
            <td class="value-td">
              {{ repoData.watchers | addCommas }}
            </td>
          </tr>
          <tr v-if="!!repoData.size">
            <td class="param-td">
              Repo Size:
            </td>
            <td class="value-td">
              {{ repoData.size | addCommas }} KB
            </td>
          </tr>
          <tr v-if="repoData.has_issues">
            <td>
              Open Issues:
            </td>
            <td class="value-td">
              {{ repoData.open_issues_count | addCommas }}
            </td>
          </tr>
          <tr v-if="!!repoData.created_at">
            <td class="param-td">
              Created:
            </td>
            <td class="value-td">
              {{ repoData.created_at | formatDate }}
            </td>
          </tr>
          <tr v-if="!!repoData.updated_at">
            <td class="param-td">
              Last Update:
            </td>
            <td class="value-td">
              {{ repoData.updated_at | formatDate }}
            </td>
          </tr>
          <tr v-if="!!repoData.homepage">
            <td class="param-td">
              Homepage:
            </td>
            <td class="value-td">
              <a 
                :href="repoData.homepage" 
                target="_blank">
                {{ repoData.homepage }}
              </a>
            </td>
          </tr>
          <tr v-if="!!repoData.language">
            <td class="param-td">
              Language:
            </td>
            <td class="value-td">
              {{ repoData.language }}
            </td>
          </tr>
          <tr v-if="!!repoData.license && !!repoData.license.name">
            <td class="param-td">
              license:
            </td>
            <td class="value-td">
              {{ repoData.license.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import IconedCounter from './IconedCounter';
import Octicon from 'vue-octicon/components/Octicon.vue';
import 'vue-octicon/icons/star';
import 'vue-octicon/icons/eye';

export default {
  components: {
    IconedCounter,
    Octicon,
  },
  props: { repoData: { type: Object, isRequired: true } },
};
</script>

<style scoped>
#stats-box-container {
  position: relative;
}
#stats-box {
  position: absolute;
  background: #ffffff;
  z-index: 300;
  padding: 20px;
  border-radius: 2%;
  box-shadow: 3px 3px 15px black;
  right: 20px;
  width: 500px;
}
tr {
  line-height: 25px;
  background: #ffffff;
}
.title {
  padding-top: 0;
}
.param-td {
  width: 120px;
}
.value-td {
  min-width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
  font-weight: 550;
  word-break: break-all;
}

@media (max-width: 620px) {
  #stats-box-container {
    position: static;
  }
  #stats-box {
    width: 100%;
    right: 0;
    left: 0;
  }
}
</style>
