import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from './useFavorites';

describe('useFavorites', () => {
  beforeEach(() => {
    // localStorage をモック
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.favorites.size).toBe(0);
    expect(result.current.isLoaded).toBe(true);
  });

  it('should add a favorite', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addFavorite('work-1');
    });

    expect(result.current.isFavorite('work-1')).toBe(true);
    expect(result.current.favorites.size).toBe(1);
  });

  it('should remove a favorite', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addFavorite('work-1');
    });

    expect(result.current.isFavorite('work-1')).toBe(true);

    act(() => {
      result.current.removeFavorite('work-1');
    });

    expect(result.current.isFavorite('work-1')).toBe(false);
    expect(result.current.favorites.size).toBe(0);
  });

  it('should toggle a favorite', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.toggleFavorite('work-1');
    });

    expect(result.current.isFavorite('work-1')).toBe(true);

    act(() => {
      result.current.toggleFavorite('work-1');
    });

    expect(result.current.isFavorite('work-1')).toBe(false);
  });

  it('should persist favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addFavorite('work-1');
      result.current.addFavorite('work-2');
    });

    const stored = localStorage.getItem('sakaisetsubi-favorites');
    expect(stored).toBeDefined();
    
    const parsed = JSON.parse(stored!);
    expect(parsed).toContain('work-1');
    expect(parsed).toContain('work-2');
  });

  it('should load favorites from localStorage', () => {
    // localStorage に事前にデータを設定
    localStorage.setItem('sakaisetsubi-favorites', JSON.stringify(['work-1', 'work-2']));
    
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.isFavorite('work-1')).toBe(true);
    expect(result.current.isFavorite('work-2')).toBe(true);
    expect(result.current.favorites.size).toBe(2);
  });

  it('should handle multiple favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addFavorite('work-1');
      result.current.addFavorite('work-2');
      result.current.addFavorite('work-3');
    });

    expect(result.current.favorites.size).toBe(3);
    expect(result.current.isFavorite('work-1')).toBe(true);
    expect(result.current.isFavorite('work-2')).toBe(true);
    expect(result.current.isFavorite('work-3')).toBe(true);
  });
});
