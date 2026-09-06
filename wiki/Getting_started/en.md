# Getting Started

A short path from installing MapWizard to working on your first beatmap set.

MapWizard is a free, open-source desktop app for osu! mappers. It includes tools for copying hitsounds, editing metadata, configuring combo colours and cleaning beatmap files.

## 1. Install MapWizard

[Download MapWizard](#download) and choose your operating system.

- **Windows:** download and run the `.exe` installer.
- **macOS:** download and open the `.pkg` installer, then follow the installation steps.
- **Linux:** download the AppImage, allow it to run as a program in your file manager, then open it. From a terminal in the download folder, you can use:

```sh
chmod +x MapWizard.Desktop.AppImage
./MapWizard.Desktop.AppImage
```

On Arch Linux, you can also install the development package from the AUR with an AUR helper:

```sh
yay -S mapwizard-git
```

## 2. Open a beatmap set

Launch MapWizard and choose a tool from the sidebar. Open its map picker to browse your Songs folder or search for a beatmap. If your set is elsewhere, open its folder manually.

Choose the set and difficulties you want to work with. Before applying your first changes, make a copy of the beatmap folder so you can return to the original files.

![Map picker showing beatmap search and difficulty counts](/img/screenshots/mappicker.png)

## 3. Pick the tool for the job

| Tool | Use it to |
| --- | --- |
| Hitsound Copier | Copy hitsounds from an origin difficulty to destination difficulties. |
| Metadata Manager | Edit shared information such as title and artist across a set. |
| Hitsound Visualizer | Inspect hitsound layers on a timeline and listen against the song. |
| Combo Colour Studio | Create a combo palette, save a project and apply colours. |
| Map Cleaner | Resnap objects and timing points, or remove unused greenlines. |

For a simple first task, open **Metadata Manager**, select a set and check its title and artist. Edit the fields you need, review the selected difficulties and apply your changes.

## 4. Check your changes in osu!

Open the edited difficulty in the osu! editor and reload it if needed. Check that the changes are present. For hitsound or timing edits, play through the affected section and listen as well as look.

Keep your original copy until you are happy with the result.

## Need a hand?

Browse the [tool gallery](#screenshots) to see each workspace. For bugs, check [existing issues](https://github.com/maotovisk/MapWizard/issues) or create an issue with your operating system, MapWizard version and the steps that reproduce the problem.
