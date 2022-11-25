<script lang="ts">
  import { toTreeString } from "@jywei/to-tree-string";
  import { parse } from "yaml";

  let yamlInput = `example:
  - image1.jpg`;

  let outputString = "";

  function generate() {
    outputString = toTreeString(parse(yamlInput));
    console.log(outputString);
  }
</script>

<main>
  <h1>Demo</h1>

  <textarea bind:value={yamlInput} />

  <button on:click={generate}>Generate</button>

  <pre>{outputString}</pre>
</main>

<style>
</style>
