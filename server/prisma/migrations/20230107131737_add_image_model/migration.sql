-- CreateTable
CREATE TABLE `Image` (
    `Id` VARCHAR(191) NOT NULL,
    `context` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
