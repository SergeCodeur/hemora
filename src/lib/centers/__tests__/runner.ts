import { runCentersUnitTests } from "./centers.test";

const summary = runCentersUnitTests();
console.log("\n==========================================");
console.log(`RÉSULTAT DES TESTS CENTRES : ${summary.passed} PASSÉS, ${summary.failed} ÉCHOUÉS`);
console.log("==========================================");
summary.results.forEach((r) => console.log(r));

if (summary.failed > 0) {
  process.exit(1);
} else {
  console.log("\nTOUS LES TESTS ONT RÉUSSI AVEC SUCCÈS.");
}
