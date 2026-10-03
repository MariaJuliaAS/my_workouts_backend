-- AlterTable
ALTER TABLE "Personal_records" ADD COLUMN     "exercise_id" TEXT;

-- AddForeignKey
ALTER TABLE "Personal_records" ADD CONSTRAINT "Personal_records_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercises"("id") ON DELETE SET NULL ON UPDATE CASCADE;
