# NestJS Typescript template for Cyclic

[![Deploy to Cyclic](https://deploy.cyclic.app/button.svg)](https://deploy.cyclic.app/)

Having the nest project in a subfolder is key to making it work on Cyclic.

## Initial configuration

When connecting your repository, click on _Advanced_:

![image](https://user-images.githubusercontent.com/1292230/218316542-ed424d8c-24af-4fcc-b9b6-1836a65e5a80.png)

Then set `/nest` both as _Root Path_ and _Output Path_:

![image](https://user-images.githubusercontent.com/1292230/218316595-9c291d4d-2f32-4807-910c-920542ef012d.png)


## Maintenance

### Keep upstream up-to-date and rebase main

```sh
git checkout upstream
git remote add upstream git@github.com:nestjs/typescript-starter.git # Only the first time
git pull upstream master
git checkout main
git pull
git rebase upstream
git push --force
```
