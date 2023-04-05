async function main() {
  const { items, totalItems } = await (
    await fetch(
      "https://thousands-bed.pockethost.io/api/collections/events/records?perPage=1000"
    )
  ).json();

  if (totalItems === 0) return console.log("No records to delete");
  console.log(`Found ${totalItems} records to delete`);

  for (const { id } of items) {
    await fetch(
      `https://thousands-bed.pockethost.io/api/collections/events/records/${id}`,
      { method: "DELETE" }
    );
  }

  console.log("Done!");
}

main();
