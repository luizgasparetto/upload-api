-- DropForeignKey
ALTER TABLE "objects" DROP CONSTRAINT "objects_user_id_fkey";

-- AddForeignKey
ALTER TABLE "objects" ADD CONSTRAINT "objects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
