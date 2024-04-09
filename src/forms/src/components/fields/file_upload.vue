<template>
  <div
      :class="
      ({
        'fv-file-drop': showDropZone,
        'fv-file-multiple': allowMultipleFiles,
        'fv--has-error': isInputInvalid,
        'fv--disabled': loading,
        'fv-file-wrapper': true,
        'fv-field': true
      })
    "
  >
    <v-sheet
        v-if="showDropZone"
        bindex="0"
        :title="dropZoneTitle"
        width="100%"
        min-height="200"
        rounded
        :class="({ 'fv-drop-inside': dragIn,  'fv-drop': true} )"
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleDragLeave"
        @dragover.prevent="handleDragOver"
        @drop.prevent="handleDrop"
        @click="handleDropZoneClick"
        ref="dropZoneRef"
    >
      <template>
        <p v-if="getMaxFileSize" class="file-size" :class="{'file-size--invalid': filesSizeSum>getMaxFileSize}">
          {{ humanFileSize(filesSizeSum) }} / <strong>{{ humanFileSize(getMaxFileSize) }}</strong>
        </p>
        <div v-if="htmlContentLabel && (!filesModel || !filesModel.length)" v-html="htmlContentLabel" class="fv-field__label"></div>
        <p v-else-if="label && label!=='' && (!filesModel || !filesModel.length)" class="fv-field__label">{{ label }}</p>
        <ul v-if="filesModel && filesModel.length" class="file-list">
          <li :title="file.name" v-for="file in filesModel" class="file-chip">
            <div>
              <p class="size">{{ humanFileSize(file.size) }}</p>

              <p class="name"><span>{{ file.name }}</span></p>
            </div>

            <button type="button" @click.stop="removeFile(file)">Datei entfernen</button>
          </li>
        </ul>
      </template>
    </v-sheet>
    <v-file-input
        :accept="allowedMimeTypes"
        :required="required"
        class="fv-file-input"
        :counter="!showDropZone"
        :disabled="loading"
        :identifier="identifier"
        :label="label"
        :name="nameWithMultipleSupport"
        :rules="inputRules"
        show-size
        :chips="!showDropZone && allowMultipleFiles"
        :multiple="allowMultipleFiles"
        ref="inputRef"
        v-model="filesModel"
        persistent-hint
        :hint="inputDescription"
        :filled="filled"
        :error-messages="inputError"
        prepend-icon=""
        append-icon="mdi-paperclip"
    ></v-file-input>
  </div>
</template>

<script>
import {createInputRules, createRequiredLabel, isRequired,} from "../../lib/util";

export default {
  name: "fileUpload",
  props: {
    // required base props
    identifier: {
      type: String,
      required: true,
    },
    filled: {
      type: Boolean,
    },
    label: {
      type: String,
      required: true,
      default: "Click to upload file",
    },
    name: {
      type: String,
      required: true,
    },
    validators: {
      type: Array,
      required: false,
    },
    properties: {
      type: Object | Array,
      required: true,
    },

    dropZoneTitle: {
      type: String,
      default: "drag files into drop zone or click to select",
    },
    allowMultiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dragIn: false,
      isInputInvalid: false,
      isInputDisabled: false
    };
  },

  methods: {
    handleDragEnter() {
      // man könnte hier schon die größe und file type validieren
      this.dragIn = true;
    },
    handleDragLeave() {
      this.dragIn = false;
    },
    handleDragOver() {
      this.dragIn = true;
    },
    handleDrop(e) {
      this.dragIn = false;
      if (this.loading) return;
      e.stopPropagation();
      const droppedFiles = e.dataTransfer.files;

      if (droppedFiles instanceof FileList) {
        if (this.allowMultipleFiles) {

          this.filesModel = [...droppedFiles];
          e.dataTransfer.clearData();
        } else {
          const firstDroppedFile = droppedFiles[0];
          if (!firstDroppedFile) return;
          if (this.hasValidMimeType(firstDroppedFile)) {
            this.setFiles(firstDroppedFile);
          }
          //@TODO: handel dropped files with wrong mime type via input error
        }
      }
    },
    handleDropZoneClick() {
      const nativeInputElement = this.$refs.inputRef.$refs.input;
      if (nativeInputElement) {
        nativeInputElement.click();
      }
    },
    removeFile(fileToRemove) {
      if (!this.filesModel?.length) return;
      this.setFiles(this.filesModel.filter(file => file !== fileToRemove))
    },
    /**
     * Format bytes as human-readable text.
     *
     * @param bytes Number of bytes.
     * @param si True to use metric (SI) units, aka powers of 1000. False to use
     *           binary (IEC), aka powers of 1024.
     * @param dp Number of decimal places to display.
     *
     * @return Formatted string.
     */
    humanFileSize(bytes, si = false, dp = 1) {
      const thresh = si ? 1000 : 1024;

      if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
      }

      const units = si
          ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
          : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
      let u = -1;
      const r = 10 ** dp;

      do {
        bytes /= thresh;
        ++u;
      } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


      return bytes.toFixed(dp) + ' ' + units[u];
    },
    typo3FileSizeToBytes(sizeString) {
      if (sizeString.length < 2) return sizeString;

      const str = sizeString.trim();
      const num = Number(str.slice(0, -1));
      const modifier = str[str.length - 1]

      switch (modifier) {
        case "B":
          return num;
        case "K":
          return num * 1024;
        case "M":
          return num * 1024 * 1024;
        case "G":
          return num * 1024 * 1024 * 1024;
      }

      return num;
    },
    setFiles(value) {
      const newFileList=new DataTransfer();
      for(const item of value){
        newFileList.items.add(item)
      }
      this.$store.commit("updateInputValue", {
        key: this.identifier,
        value: [...newFileList.files]
      })

      this.$nextTick(()=>{
        if(this.$refs.inputRef?.$refs?.input?.files){
          this.$refs.inputRef.$refs.input.files=newFileList.files;
        }
      })
    },
    hasValidMimeType(file) {
      if (!file.type) return false;
      if (!this.allowedMimeTypes?.length) return true;
      return this.allowedMimeTypes.includes(file.type)
    },


  },
  computed: {
    htmlContentLabel() {
      return this.properties?.content;
    },
    loading() {
      return this.$store.state.loading;
    },
    required() {
      return isRequired(this.properties);
    },
    requiredLabel() {
      return createRequiredLabel(this.validators);
    },
    inputRules() {
      return createInputRules(this.required, this.validators, this.properties);
    },
    getMaxFileSize() {
      const fileSizeValidator = this.validators.find(validator => {
        if (validator.identifier === 'FileSize' || validator.identifier === 'MultiFileSize') {
          return validator;
        }
      });
      if (!fileSizeValidator) return 0;
      return fileSizeValidator.options?.maximum ? this.typo3FileSizeToBytes(fileSizeValidator.options.maximum) : 0;
    },
    inputDescription() {
      return this.properties?.elementDescription || "";
    },
    allowedMimeTypes() {
      return this.properties?.allowedMimeTypes || null;
    },
    showDropZone() {
      return !!this.properties?.showDropZone;
    },
    allowMultipleFiles() {
      return !!(this.allowMultiple || this.properties?.multivalue || this.properties?.allowMultiple)
    },
    keepFiles() {
      return this.allowMultipleFiles && this.showDropZone;
    },
    nameWithMultipleSupport() {
      return this.allowMultipleFiles ? this.name.concat('[]') : this.name;
    },
    filesModel: {
      get() {
        return this.$store.getters.getCurrentInputValue(this.identifier) || null;
      },
      set(value) {
        // handles appending instead of overwriting files array for input model
        if (!value.length) {
          this.$store.commit("updateInputValue", {key: this.identifier, value: null});
        } else {
          const filesWithValidMimeType = value.filter(this.hasValidMimeType);
          if (this.filesModel?.length && this.keepFiles) {
            const newFileList=new DataTransfer();
            for(const item of [...this.filesModel, ...filesWithValidMimeType]){
              newFileList.items.add(item)
            }
            this.$store.commit("updateInputValue", {
              key: this.identifier,
              value: [...newFileList.files]
            })

            this.$nextTick(()=>{
              if(this.$refs.inputRef?.$refs?.input?.files){
                this.$refs.inputRef.$refs.input.files=newFileList.files;
              }
              //newFileList.clearData();
            })

          } else {
            this.$store.commit("updateInputValue", {key: this.identifier, value: filesWithValidMimeType});
          }
        }

      },
    },
    inputError() {
      return this.$store.getters.getCurrentInputError(this.identifier) || "";
    },
    filesSizeSum() {
      if (!this.filesModel?.length) return 0;
      return this.filesModel.reduce((ac, val) => ac + parseInt(val.size) ?? 0, 0)
    },

  },
  watch: {
    filesModel: function (next, prev) {
      this.$nextTick(() => {
        if (prev !== next) {
          this.isInputInvalid = !this.$refs.inputRef.validate();
        }
      })
    }
  }
};
</script>
