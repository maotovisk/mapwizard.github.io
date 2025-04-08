export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

export interface ReleaseData {
  tag_name: string;
  assets: ReleaseAsset[];
}

export interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export interface DownloadProps {
  release: ReleaseData | null;
  os: string;
}

export interface ImageSliderProps {
  images: string[];
}
