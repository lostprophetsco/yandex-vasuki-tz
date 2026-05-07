# yandex-vasuki-tz
Документация UI-Kit для проекта yandex-vasuki-tz.

## Breakpoints
В проекте доступно 4 миксинов для медиа-запросов:

```
{
  "sm": {
    "width": "576px"
  },
  "md": {
    "width": "768px"
  },
  "lg": {
    "width": "992px"
  },
  "xl": {
    "width": "1366px"
  }
}
```

Применение медиа-запросов:

<table class="table" style="width: 100%">
  <thead>
  <tr>
    <th>Mixin</th>
    <th>Description</th>
  </tr>
  </thead>
  <tbody>
  
<tr>
<td><code>@include sm;</code></td>
<td><code>@media (min-width: 576px) { ... }</code></td>
</tr>

<tr>
<td><code>@include md;</code></td>
<td><code>@media (min-width: 768px) { ... }</code></td>
</tr>

<tr>
<td><code>@include lg;</code></td>
<td><code>@media (min-width: 992px) { ... }</code></td>
</tr>

<tr>
<td><code>@include xl;</code></td>
<td><code>@media (min-width: 1366px) { ... }</code></td>
</tr>

  </tbody>
</table>

## Grid
```
@include grid(parameters);
```

Parameters:

* `$columns-sm` - количество колонок на медиа-запросе `sm`.
* `$columns-md` - количество колонок на медиа-запросе `md`.
* `$columns-lg` - количество колонок на медиа-запросе `lg`.
* `$columns-xl` - количество колонок на медиа-запросе `xl`.

## Themes
Всего тем в проекте: 1.

### Default

CSS переменные темы `theme-default`:

```

```

## Utilities
Набор утилитарных CSS переменных.

### Fonts
Объект `fonts` содержит следующие миксины:

#### Fonts Family
```
@include fonts-family;
```

CSS переменные миксина `fonts-family`:

```
--fonts-family-golos: Golos Text, Arial, Helvetica, sans-serif;
--fonts-family-merriweather: Merriweather, serif;

```
