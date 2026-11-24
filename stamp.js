// مهر مؤسسه به‌جای مهر نوشته‌ای «امضا: مؤسسه سفیران» زیر «باور ما»
// عکس فایل جدا ندارد: تکه‌های به‌هم‌ریخته روی بوم چیده می‌شوند و کلیک راست، کشیدن و نگه‌داشتن رویش بسته است
(() => {
  const ORDER = [3, 14, 7, 9, 13, 11, 4, 5, 12, 8, 1, 0, 15, 6, 2, 10];
  const D = [
    '=AAAAAAAAAAAAAAAAGx1FWug8//vj6/Qr/Qr/Qb///nyl/v/AAs+eIns99QOZ77hcy23D5ktvHyJbfPkT2+eIns99QOZ77hcy23D5ktvHyJbfPkT2+eIns99',
    'QOZ77hcy23D5ktvHyJbfPkT2+eIns99QOZ77hcy23D5ktvHyJbfPkT2+eIns99QOZ77hcy23D5ktvHyJbfPkT2+eIns99QOZ77hcy23D5ktvHyJbfPA7JAAA',
    'wPgbPC7uwdLtEMAIAQBEhGioExIGx4TAgEAIqEQnAQB8AAAAUDCOQZVBQYkg3LJfKvfdfyQmhdqInOptBNV+v25Z1Kx5Q+/xLtYev3OXngNlgpLG5X9slXe0',
    '9EhWXfSK9nfRHx579eTzmmpbrCYSV94LtbkgQR4Iva3JvYhs8+ab4unZP1eG/6EoJcHVwZs4KqzPcyN53F49Iw+4dyOvL1F6My5pHX2s4Kvux3gxLy9NWc1K',
    'jvsHfBJAIDTOKJ1tBPqo4AkF4PRi/qt3Q8HeCIxHuwptreMpnMyXmdRk4dFCdniPoMQdz5dXWtygOrAwt69uzE5gyFyoSh6hgo3Mktyy1AsGWzEcwpDEEYOF',
    'ZCS58sduM/0mgd0YlCgGE5n2s3qX81BEc6JrM85QBj6OQ93iLfKf4LEKtQBzUD4Hv+/H9mY/XKHooAsxrakKQ7p3fUgWvc5vAJAV+iwwwREuUElQZ4LktXGU',
    'P9ECAQy5jmSi27KXFc1pDGhWZHVuR/0g9KJA4AXArYC7GTffK23K4D6opNthSm6JsnqffyYr1cXo4mH81hbdY84w8XZctiPGYOqY+O1+AC3Few+kkNvbwZHo',
    'vLvOCb1le5Vx1BOvgCdLzoaR3+VGTwitUACc5cIDA/cNFsOMpPV9uFkeL3Kre7DKFEYUAktXMx6a3rCAdsDUsMc9JkAnTi241FfShheR/HHgrnjfytBbaVAc',
    '0fuyVZorCcyWtZbJ3tECsUfRv7GbrODjXj7JjKNC8X1kGpDdn8FgiXjLrcNYssADJ1YCKWJhVJ2d9spNmrxEzjgHc8XWraVYCzSwR2HVU6PHna4+VOql7R3H',
    'Ua3jGlCO8u6qABVW0+nPvZ0RpnqXhNM+89xlRKqSiMk+9MXY3DLkVAz4ibLgPB3AmWHA1XzsFrLyAEUMuw+53n1vv3UeEuncHFsYLauIEBH0O/jjjunwU4vh',
    'KA6757BoYUjN8no9r3c9LmMGhLcUDjo3jUZOFJi1OuE3BWTT078trAcVUt+4s/GTPQP/QSh5My0vPmiv2CHuFC6IErShJavf7AjC56/XTR+GmztoF0nUgWGR',
    'EAOAyyvk70u8IZsinKvSNZjAcs73QAg2AGdrw80vL4i7jrI9+5NKTs32FCsyMCcn6yUsl5fXfIVzjNYXIvRORyg26WbYAUgfgdn/ysMDuWJlWtu/EXYxOeMk',
    'HI+AOCNVFoUIKQfi0nPz6+4I8YX5AciYf9b5AcEd+/PfsUQW0RNFfoEcI207k47faXooQQXGAHcIcNrDxkM5TsJbCZzhuvvuiQHNW8CkmNjOVJoToRfX5x7v',
    'xrV0hozDOArVcua38d134DdA29U+R7G+MESMVzRhJmISkgFp2rHQFFqs3+DHOPYiaxBU+CFhrMZHAhKH1boxEPH+le2LRelcSkwtc7ytCqHaV/qThY6ruaXX',
    'pWVg2+zfHUBns579Su09gBQT9FxS7l7/Kpn1wT+NezsZdiGGe9ZPuF1wIiEWydHfYDtTev38xCDGEpKuLjT4+d0QNXgvXeJBQ/tcT2iGNZC8+S6S0/jvHUtY',
    'pQoAtLRpOZZzjX3ro5CL8aQGAHwwHqmEjEbJgtBv0wQbprnhvkQSK2F9ZNi32ug8e34avZ/1rMmhWX6t3l3noRRpSBKA5o8whgSMAcIJXTJxiYqjGAf1pfju',
    'CmsM5UH5f2nH3pmIAMuGQsUDjtLhjZVrlN0d8mR+f5A7BujhksxQJgi8K+CAdTCV7v/b4S8V83fhHIHIrVW+69aG1XbFuh0Hrbr81tdksTrJpZWYx21ESJif',
    'KDO/WhJZ/pFksQa1rgEAoZXjKXhuBRR38AZjzHSYrFL1oW9y4YQ79OtoHDQM/tCMhVamUr/lv9ZMeR+fb52z7lE3ty3smeZtU78BZ7Qg42/mNrK2GRrVN2bA',
    'DjqfEQj6kXYcqyKXbBf19+93yTd6zm1Vj32G+BFAKqP13J0q9Ne+lPSfqKg6Fp1wj5f5rO6kkfd1UH/vpjgc06fngx2hcrffoWdoIxnPu0xAX3CAF4SojLbT',
    'mhPCo8IJHCCC08ikLZNrtf1nZq33LuEEESCrQbHXEQ0TWdSXAZ4T73Y5kLZVkUmwXv+d6O7lt548fS9qOGyan/zXsZkxGnmV3rvcpgmqXK5SAnRGUkTNTjBD',
    'aLSA194hdSLChzukuctKvRukz7xRw7J95741crx8Jf1Hn60tiyeLFracpXpYHVFRjMt3DQQafYBEA84TUpXIYE/bQZ+/djsDc8qS2u4fksTjEx5niHHPspdA',
    'tTxFfCMIncfk+8blP1N0cXaKi4clKYW94nG5n3XF2qukTNcTHyo2089n3uC5NYd4qMobmCCWuXdZlX+yzgHDRTH9qXihpO7veaQNiN1tJ/+k46ceBnXnAVE9',
    'PXiLzlhuDfu6dKLuT/5eOYX+pv4i+rY+/2+D96JwqsdMU9yG5fSD2idS/0dAHISL6+WAH+mbBrMkJ3fIHOEbwNTFl6i7J1w8s5ZQTbqA4EguJdR9ba81g4pL',
    '9/RXUD+spqw1XJM2uSUfMoSIM1OLS3DvYFd93M1CSoqzIVQhkw5Cs6dSqkLevaOrcv0tgiDctPK0pP8lBNr07gRLP3f8ADx7ii8+xxSpQQ4cz4L5QSRFTxiN',
    'TuZyLQyNlTuh+zln5l0pnUyJ8bUOnVsRUi2swEu/nSePbCxW/AphG8oPnsfyD33iTBRfOoBncSsrAADxHPuEF2XMSm8ouSwImJfNKPILbntS3f1zJXy6P7ff',
    '9f7iJ3TdtK2qknS9GUrdTjGYBb9NaFUoCHmoT3ztfDq1Qg1B5p25Gu6NVqlj9twZx1nOtcRbhW4auetaXyfNO8w7pQ9WN1BcgQvknLtehFm81/GSgF5r0JEF',
    'ObOVn8L5R66bHZ5zy/qQbjyaZtynT/6w050dJ4ESMy6D5Dgkf/2kX85Opfq57A6W3TM/f7641JZ5Xs4ybijdgiD5kT+5nR8HISGZo5GBuJpH9ty8ucrkSRML',
    'ubFxEWgmF+Dlv2UDTgv91HF+87J/aSzFvYV8nTKk50RpmFSIeMr4AZz9gq86cd/eN7t801QETC/68G5P3EzryXLvT+16PrNQJgDO861LXMJ9qDmgKUfy3EQq',
    '82jbN+2rV9+ifn+saYF/T5CEFO+utDUWWMb/Q/QCHqveesrx/BKM2aeMYDrkjx+5vjnfetwLFHo0do9AYlVJebXn+gOxyj0nHTs6A5R2GXJ/x+ZABct0+wtR',
    'mxs5v6ZNPsczMlB9CxFA5d4Dl9yv86xraO5eq+8KVnXEh1zUhjuKoAZN/96tiZLJyArlgeDyIw9/Ev2R/K5KSD3Nc45nr7TD1pNoG53DOnvqTlCSFKetoAB6',
    's8ImstGP92smGCNbSqE/yn0R/ItZ3E6ma0Z22gIS5Hibm7ZLfm++6zwB0zjefWOdM0YkJod10VUaJnLJ/hG/fOgurIXj9Zl8iYdy6CFBJ6kFF5VPt0o8WryL',
    '1s0EP/sSr/FUApISRx0bHmsLnzvznXdeieMb4fZa+gnwU/cEqnPP9h4W3YTUQAQLN19JcVqeQc9A0zMp0LZVDhEyUSP8EPsou6vf3Va0vn+0cq2eoiuHT93T',
    'gnHJ5XJSslfqDSp3s7t7DsT/3J/rChcAGgVPObmEe9uckIt5bj553fOZXlvHcv/n64NZGqNbeRPg+z7n3mibaXwlkVu4lCrcFqFbH5WgUf2x6Mt/RMd67/xy',
    'j/bu3FNPpgM0kCZu4nOJCBhumRlHpup/fPm6fdnR/6byyFR6YCA84+Mc+DZNXeeKuJRAvjEH6ZPfQaXJcKJ+c6/AbMMfPU1MK/Tn/yTfT11/+9bR1yyMAFr4',
    'Dy6o1ZIjw6opw7TXFlnkqdMLVrkoSQjWL63nh6naxVdv9POlzx3mM6dLbnJLDgSnW1+eiU+1narGe1VXfNiZGTqkOgHMbXU/vW9+QdTZnSM+9o9b5/j5fv+V',
    'SiUneKkfdcV1WKM3h+j40IpPhC4qOEnKE+/gIwQRdnJJQc7Zn/yFR++TWuH9ru+/KXKqCUuz+AkWSl0LXeckv5fX/Y3BaxOSXTUjvJpJIzH4/23upTy3UGJY',
    '5dz+szgxTh+Dvx8e9xrke+QRYWOH4h7VWsKSiBRlhOSteYLYq+qLGJMPqw5v+wbEAO78n8rb3N/x37dQkbIt/xiVvX1aVNBI/d/LAoBZR22TljiW46Mc+fls',
    'v/u7vlOLpRCkDW/8uabMPRTX9/f7QwzEq9n1ehMf/Ei70/45KFV6l/5AZv1u5dSP3LS/nR0hpRFT3TVv65D0AtgmYMJoQrGV2nOVeDf7XRylV3UOzsaO4Zc1',
    'x0JHRH9ROtGs+b7FkOYI34JS3rSSMBumjxybP8ah7cI5Vsef/WuhT9O3FB79dsO1/MN9p+wjMCtiiru8Hd8+3TiKJ4qwatfaoLH4bwaua/hH3Nw2nL1fm2oS',
    'DJ9SR7xjPxNxhgumkCCAg4avkcCjLbSuXxfuoSIVfOmXhVtNYj+N6ESSzPPIgeut8f102s62x1HqPqW8d33Od7eU4sW1UZ9VkAJo3hGBbTi6AkJkcjlylwD0',
    'u1kzcYhS96FSX8DCWX6M5nPJPzsvuJlV8jQvkcymkXbSMsxdllyUP1h3sjHe8+R/UGrsHxhrwHKzmK/zvjiTOdXdi65dmITS1CwBqpmPA1TStUeXd3apevWY',
    'y07XXgVMIojcAAiHayjkXcX6AEEqeLpbs+xqT62Ok8O/rWIKldCu4vDffiQ/nRaWm4Wx6h7Bad4XDibbpbSYqULefJ9HSGGP+DN0uBkW8FbbzIwJpl/Ap3D0',
    'hhnGt7kpnvbxv3PP9KRcf5a3kQPv6GP6qv64rGe6DZBd7Ax/EStel7Qss9sf/MBzj/kKkWlif/ORtEB1dhIZylku0ZBc79CUMgBr3oSFynIctK3OQ/wemhbj',
    'lazu1j3NB2fosjz2X9snq76sI4coiA8/hPdvff1qfXaP3mCIvTL2TEm8rJ/Zi6LY/8c1jjyC18DlgDwoac7NQyxw91Uc29A5rnhTOrTOJdn8fK5Pv6lkfM6V',
    'JHB6YXBJbe5VQXFfC2nSLpTmmGg8vjFzrsS/cxQyFYUFK2VsK+MdCNi7iyWhfFSbPTiJCXy9kwj++ov+xfT7D41kpb07IsaqI8yu8l5N+mnr8jyRjYgyzSJq',
    'hnPJ6D/jSLfbjshkkBs383GoXDGamga73vc5651W4u2NBHwNzQDec8dJUFgoVo/k2xUoIpCXoToCaL4+QvnA+jUeE3wURyYU/DCly6TU8YocR6pgRjOhVlPo',
    'H5kmXANPXt4btVtP1jM9uGkM8W+270o/wD7WERel0IDSObRQ+Mpcnta5q/DrkT+fUi5dTK3HCD/NoHe4C8tmtDCCgzhc7BYye+sb3GYQkNp3X5FgcM4INoz4',
    'YlX+NAovP9DiN1BEX6zk7DNOtSJp7HNghMU2YhjBPjNytVMfTkZZiWtbOOagOJcySA2BQ4J7c5bDlRHYSCsxuLLSegUe0sTVI3P+NsZKJZu4Upp8IxrLMsRI',
    'e60t8+oiWabxzvTWFR35OhNZPTyVNDQnb4dSry5BbWKo4Da+g1/dIvZIOIdlhzukZZU6G45qNdwLLYuPUO5l+Iun0zT+I2V4CpOvjISEBtfFrEtUICA894ze',
    'hKRuiAAHlqV2y1a1vgP+ioDsqg0Vh4Jwe8PxhggAbjQar4/1ed4jCdbTAxzxHCGgJn+YZZd6DHO+cve02zVJLB4ERxZzwxNuGVFkCNx8/R+90qlmj/OiCMHC',
    'AI7Uo4JSvJ8yhiGplI581H99c4KX7tT7JGv3NRJ+7U3NKabzfoc4sjP5b/vdd7Gh5ffNw8+jHSobe6syd/0ilvt+qFeAhAQS9fbPjauzB9vmIzoz1o7ae6Kq',
    'Uej8LhJirX4udoB8BWtiq/5RN6YYIvlwV9e4kvH0+cYf2++enfv24nOvO5iMUO1zdx4kpf/lWmJV+vdb3ibC+gS8i3BN/kzojoGnqLFywDrPTVhqnzfWd9TB',
    'Jhy9k/I/MhOeTDft2htiM1fsH7/1m4v0jdtpCDnhLIb7cGYH3Nyuf2rOpxCLiUbx+EjkuvyYFe3u+blSFD8e8c+NHyLuBIBNQVYjc0Jru5nt8Xqevc3zmat8',
    'AlL+GAQUcKUGtY5Tn0iS61jJdZeD1++M9JaZrjM+brW4t2lLjYkh7/XOKlEWL/vHKW1V2bRG4Rm+KkiSN9V4u/mDpzZr/K+DvfPt7RYj+RANFw+GK/89sjrq',
    'N6BzCquc/R/Vlve6Fb88xJxgcNZJ1RSPJvCmlEc89/mZTK5NHAgSJpwJn9r8OXRO0za4lPQFR6SO2joNQ9s9rNjMz/CyE5YAK3N3unJ3NW0WB7Q4mtpZ/9aP',
    'UxBOYAJnluJlluR2PUo1+NUJFkUGvfKuUrYYTLdq0c/MrLax5tyWRSXF3Va9gnHW70lVTHXrT7K/SW+3MHhUbG+wyjmtGdnhwbomNIB1uNe+cKoNX4A4Xbxl',
    'dyaZ/IpN9bNBECAO2VnKCtJkSsFLe6Eu1T/oV3zswYtvFwTzmP6/WUvMDmY7W0vKrGfInYaKgMTOEaOt6grfvx0rRl0HuO9e/78gf92PUCodMvvQgRrew0Gf',
    't+b76uA40DpxG1dKekdGCylcJZfqbThz/HLiUlrbq4Rmz3qeARhlI95XcLiB5GtYJ6PZR+s47t83Ct3LliLA3PI6CDmhjCV7um4eyBVAhLpHc2ku2h/FvqMb',
    '4BYn7AVEUTyZnQGiUyT8AZMnf62FtWdh43TJy4n9QnVF2bcagAQjzNMwSSI1jz2Df482PwWbX1IyU6277FOVnYDfPW64RAAK6OuXrFAK+4svUDwV2XHzlQCb',
    'ztutKoQeoEe4BA316MlKGCkWZPlQbZiTCA1EnWIAE86+QYAZv6JRcXO0O5VRdRKobVD4YjRTkFggsmneCAlecQ9oHCgG3db2anJmUs3f37Di1dHf5YjwQN15',
    'RC10z1WdfC9Xznu9vDvRojX/TIOU/pzMwZ97thU3V9xtEKbVZzfvNAAW4HsWgxv0BIFLeLouXWC5VPNLq10haoUK5J311dbH/LwnM1zTwOkTLg/dCkUKL3jy',
    '6Y/vFprOBKlPrg8IruzRWKNrhxNImzBOMiLRSiJz13CCMPt1qRJt5hifBxw1ZOcYJcYt6nEzTKqRUUgEOGuA6U5OjXbR8f5/Qa0TehvoaSKF60DjXVGFK1Vt',
    'LfbbBwflQgKgD4THB3bQEYTOKk0t7PM2FeDIJxy4ccatHFwzBFzrNpOCo8yHVMjKq4QPcKrf+eN2kE2CA5OH/bAnBXPB099TSCqySKlRymWYQT6Ew9WeA10q',
    'H0KaPP/F3BjR/eZg9jx7wnqnr2fcu6RGR30I1ZRhYNU+L/7ybCnYdqmAvxB0yn+4PjoIrsIkfOanKYJXSGwtTZGYrgd3/pCsOqIYvBVGDKzpN64wIUiSdVMF',
    'CvXwLUII9enk6lWbOnDSstlnqMBW+GNZhRuriiX0NHUKmgDjiQAuAYBar2rLOCtQOS/i15Wjoz24+X2YFAWzCfqkrZ/Jpm8v+SjsWZZnDtFJ2KoC1ic+eoqB',
    'mPJ7hHVmUMkNrzD3WIh+dvzK4yiYpTHAMwaeKYNCpQ/GvrFSCfpMaqLumFvZcmKSKDyMEMHGKXGAYU548kVQOYz088Q4V/P0Rjc7g4GWhbjkJqu7ExpjwMEl',
    '3/6hy1eToTQmGRKZCBQ9lzkFKp71n47D8BhohQWwB9fsvjuMUP2jFzHwbfwLugKleJ5HlfTQSkN3PyPRUDpMMFarO1ov2TOwkqzzfhpJgBN0hWb+i4B6goKn',
    'caLkZu8+J+HOfzh37gzMGEMOXb2C3srRHkzLuYKCSjf/yNZ6Xdn6GZGnPW0S07f4VQ1GohMGD2sj+LIN0fn/JP4OmkUP3XqsT/HgCz51sNMlUCg3yTg0JJ4w',
    'VOpHff6V0IdtF2aw13VR/JP21NCJ4CsqCABe0JnPRw/CqbnjMK+Wr/LstWjwhRvcDNcxBqUdf2ffVoPpm5Br/qsvIk+kknNqQgDprWTKyWba3ylr2+QUoqQn',
    '+33l0Pzb2AbIB3v8OrXh08oi2igPIjvoBem3k+KsZ1YinNfXCdVeK7Xm5uZ9lwfYaCc/QV/HIbiMOSht1ILCcuJkjGAn9jDbG/l4HDGc+4m5VZbAzkXVxr75',
    'qhrfx6EAX/nJe8BBrNB5RGf6wdK8ruRJ7Mx4pch6zEEB0IN35rioQ14e+iiDRscWwIX6Jk+XtVjiU+ZtXGNNaaQaJhi8BrwJhGvjzmDKdIZBpfS0Q9vbhmCJ',
    'TlLaM3G6UCqYS4B6J0pcGxJkFVn5NNtEG2B6+/GioCr7GZlv2BYChOn0KtdDoDFmOXniQt+sRopyTxtAXV2dA64Ff4zayPnEKiqrGtrvhgwGGJBfTp/Siixr',
    '2oaGj9KXe1aaCC++dLALbJXJ2HrkJOxkV372emF9naj78RbAqB5tQjcT/ETZnai3ppkRd4MgICJXBO3rAKYpT0AghvtPIxtbfZUYDDoloCYKXUJyd0HM7eeM',
    'r2KKugJCCdj74GxEzMBjxvNwkG45ceslVUFHdafN69AKmAPDW9syrlBktNGfQxad9tLbE4Wb3qk8bJC8tcDfObm1TAo3lrP58gW6JDLBog1MGPo9cOVTiAge',
    'BXuLoiBH90978sfXNNwA0BbuW43W/PL/SqaqCZ40OoLg0WhBB1dJcpOMy4+9l3aVOg2GLn4Zp7LSLLtrNRJN6PUckBsl3EwMQZwQ9MZspfwYD8xI7T0gVVzl',
    '0nrVGhHco7K3spKmAUu6iyK//J96o4s5tslSjzGYbZPkJaVpRQ4RUNs63JpDXytkjhsbuI7VO3slsu/fRJU/Nf06BgN0cjJp5CZpxmbxiL/vNpUDLCaoD8oP',
    'wr0aJZlxycK9/A6Ezvv3k/STEOgEr7olLHT5DVrnI1fpfrcFlw5a5IUYcVB6QBawyPm1jP1iqqTm+h7WtR+T/uW02LBFlY3tp56nLrTBetlPIti+qrgIJyJ7',
    'iJC2/YJ/ca3IKs13tpiEIiJDtHpNk/4q+XJodq2z2c0PGLYNdiakC6ERrVy6v0Ik8JZGZ/65s7it7z3dpbBCN8sMzU3Zn8SmUNHoyl0xh6pk+TnOe89duuAG',
    'avGzftxv6x2Hnwzvy4bkJhP+rKJC5qakjpASsWU8yMtkJttvTdG4BHe4Dcz/Kxk0nd4NLC+GrXTykXIsao4GQBXe8G9IayOwmZfXrSmvYIXdsmLJT5eS16O+',
    'sw+83Ml8lJVbQgzxHq61vUYL0u+8XksAiLHrZbHvVYLBk8yNN5BQLAh70to4FWmGTvY15MPvp3yZKcZYa8KCFUKIIxSK4pFIGlFfkw4y/9ic8IZBgLX1UgVd',
    '20Bv9+mmLMTS9pDEYt3nRaHUMKG+RzVIfN1cQ5+aZVHpdNqaDorUQ+VBO9OSLcvkvJOE0sjQJDb6sL5NvU9VwAbglbhD79J5frXpem0OSwe9249/947Fs/VG',
    '51ub3mSa2PqXWMkvFD1ggwivDTniLYanJ+k0deE3zmfFgl54i/It1+ZIfJZgZc86ey0dyfb3uvvdxoQJbmUI2nREIlddp/RFhjScBDr4nCaG+VVEQAB7BnaB',
    'mRPg+msRP67y/t/Jl6RkBWQhvWgqz3g9JpGXpKt/2vdUZ7VBe9qgWlQ7HsRKSy1Pc4xj9Io/k+iAPdy8lraw2d9R4sUEv1X0f+fketl+ofoBTFEL/D/PS0gD',
    'GnHfYJzXjyREnI7iEor+fPivPN47jWKLLTJ5aJi/d4XREWTrESwx3BibbWA7dmbEgn+etujXsc9t11gThmcEHPPInxlk3WOmGv6fGHsqCcwWvAZqsrwWGnNR',
    'B5f33xHyPnDD6QyLh7WTaOhEL3nsuT5a6MQSV/y5Zb0uvXPYEEE5b8MYjACjoiT8/wckfK3YyUfi/xEuFDbYpIity53j7elLqnxIyozheVvV5bvsQC/e/gtb',
    'SCV5wGaSJvCGM0z0JZb+OqlOJHh2B4zMAmQIZTAUEqXOzrGvp/pHvuD8VrbIEKQAJnrNp/lt28+IifKQ6FiCmfQWIUuAEHyAquj2gVtbNa0rxTIj3uxUC3zt',
    'wm1Il33L765/f/13kIo8448mVHVEU7ng+o8Ieh6j2eROjYDd3IWy3wUwGd9D0wsyDswbPK4uK7//PR12lbpzW16RERCIGMZGPeyJmYXt5SfkvnA97tbXv+yl',
    '7i850gedrLbjptAUyrmNRGpfZnFIsU/47V1BJnAuP10PVumaRxuZ6zQRtBBDd7y1LV4y8NDFYGZw9IFm3zfJtWFVxmFVrO2E/2SJBnHO8f2NT64yFzNz5tvL',
    'nIFBSmj88G8A8/5Kn0Ka+mECq7FMxhcU6j0Kr2+RSTJpz2pfupcs8b1K1R51kyCLgsc9hd9XDHC+1SFb3NpkKMbUvXDKrrdqOdlcu8xe9zv+PrfP96VbB8DJ',
    'PSdWD2RhQahuWOP5ZmHaN12F7O+rpjEAWyZppMB5/k07iWhVGm2GY0/+dw4pDYbgDTIy0kakQ3AZA8Qa+1GihJpXDwLvEHiII/qXpjFWMpkat1nvq0pbvBJQ',
    'DMt8dkng8I3TqkOJPQy1iH2pASXkYu1Hb+uyymfuKJV300Tut6Fb0qbdpBABQiKSovRnpBQaENn+UqGZ37a+OrBB080JtpaqHtJI8+1JcpeAu/5nnT6sHYUS',
    '4xQHtYJ3xCj3O73SN3Kl9+2pQZPUcxibnilx1xITPrQqJXDLjM6LWSIAjWjOIDIJFvEp7fbhlBA9fWT1DRJZPeM5LVJQvxM+zzzjQQkTNtHtNO0QTIwnnwPa',
    'xKkFM/FJXSo4IE0cv/CGJ7gNEEiKhczjLiwA//97ykPPY+flAoA48ZadBM1vfcHW97zJyC4HSPPd2CG82SeZDDmUXsZl16ZRGFf/6NWTC6I1GzQqFWSpEWBQ',
    'yfz6XdRE4Ew2eG041gJ1wBgCIxVzPrPkzYbOa2ImtQSe2Aq2G+ri1zeIZUPT83ndfRKgtP2uF64nIKFTG1uyE63tnkzXcvVvVh29Ctqpy6jWd8w53fNSQGY7',
    'bfb4n9bsEDYpW+obtGU3pcgba8iPa1upJZXs84v8K5pTRzabXt8xoH5X0FwoUkOD/w9TXKZ9CsKzWOhPgec95+rFOPoCUCYtZ/7RWeQrhJgcUu8wxjyuJr9j',
    '2XVP9lQ6+j0ACubVQUwYCn7nESqNw3ISbX38+Z03kqMAIQO9wDvox9Btm8YkfNpG1yGfW1X9oFp0E3PBVRWbYzeMx6qxyUOQc1ahByAiUf1dMQWA1nnonj8a',
    'hGWXFt/1WdoSA5LVqJn1H0aIYaNtgkgHYuzP+cnvEjY1yP39tZFVvSF63rOAh/cQZ07yboOdpDsZG7Lm2EDrvICn81P0jBNihEmWRGTVvVL5CKHGBYSq3U8f',
    'sy/yLIe9oPXQqU1DMhI4Akgq9S+dAOxVFn37bXjNcjv79GTISo4clvboigCaiB2DLq/iYcSJMc6z20BfFqx4wTMu1Lihagb0xD1jrN3Ady7a0bNv0SLPd5yW',
    'aw5YjSLOqpmp4y/OAOxc8i8xzUWEOn/Y4EcKDiLcqrecMenIe/IjyQmsEG8Wo7IojiitIemfcuz0YYYpa1f16sPgMP2sDUPzzVVqLvl6+us/tiAkNWR379s9',
    'Z/m7+sYAaPfIbHHvuAF35lhJU7iKoothm6ROano6WSTjDRWwhLnb2Wz+pkkY02ipQz5wMyX+m8tWzwg8PLvnJno+1V5OTpVoh3JqI9vh8+GVHtvxAKSNxFek',
    'BANfz4qJOfV70svDJkohW+0j+xybdhhGhDW+jo912YFpPaKrKHtCn/dz29pVdn3XHWBH+HWuZNAR0MCgaev8S6zOsHyRlVY/tOX5wzGJYr9F5i6CXb+Sqpua',
    'PY/PgOYk3xkh295tUxfUvxF3f1Ry9tQasb//qoDntpXrOxJAW+c95b1/vo/w6SQKRpai2WcDCHs2nFy5Q7iT+bsLQGjSeYl1qphEBGZ7JrwkUrjPG/frnUqx',
    'jY4hOAAUYyY3Wx7dOsOoexFAehdZsRyY07LrSZH+MNyjKmGiMdwyXJpDFgMgrruU6GKHT0zVu01sLX0ouLAXH4wBYL1XgG1TpzNIbrVLB6USIMSUJoeC2i/b',
    'QiA6ulci2jidN2FUKuwOBwOVYGcVVNNw7RHEOYt2l6jw96N6gFd+69KGW1RKlscCPpNEoZkriaCgQCTJ+0lEBIV8eDeDIZ1hOQFOA1SLnjc5ltIome/awoHe',
    'kVXZYaIhxZ/lVPNN/7OgbL1vnCALWp7XYej8OhVGl/exYyCLhYdHNBDiPC8jRGhgm/zSq/dFQecA6EXTjTyfsHr1FtKkAtXWZSpmOZiWduDwG1+PVSf1D84O',
    'z/ZSwiVFkYBrVM3dUWB00f2JnrauJ8fABf1HQwSHv4BSqxZnNaCm0R6cFX1ZvqcL0hvOazT5QTzpLsIJCGPmIpFH1Uwvj56NnHg9C+r+wc7qwHWI1Zq+tTul',
    'Zw4gUWXKwrXclRX53+vZ5bSffer902aVrJ28+wl+oWIRERTDv4thWqaEDMaGeEWS0cXoVMx9bb4B51jSPYfaoZ46f4o4xjnueazlZv96SxNfnUd0gCQpZqOu',
    'wjwi0cjrI4Q2D9Z04cWewK3JYfWQ7dGkXYsIGEJg4GLAIXOAPkC+2dpGyJ3ctaCyuzmVumG+PFLyQScmqhK2uDuXOrvkCBgUoD4BIEweIBOkSPI5OixZ/nQQ',
    '0JMS5TH9jsd1FovC4ORlA2YiAkN4AUq1hKsJysjQD5c8QOaF56KshvGcR9Hb6Wj0kS+RJ7QO5YT5toN2L9sMG+G5EYDf/S6eoVr1ZuWIdQK9VnHVL2VfUEq4',
    '1baYA4k2+dN14WgPRa2kuRfh2CsnkPP9f2qnrez0NxLwYpinacD1MTUdPkG7xR9wnTg/xsM2L10YSuUpfWpS7eB0kWBrou+kAIiGh8KLmlrphzVIvhgAxyTp',
    'n9Yym8zDXfd8Hxr18QdfNvtbSFpUY7xuw7oHRoBMpAfn1hffk75ZcxYNUzoLJJyvgirFrroiGnNAF4xDpoT15DttqcVeNYo4c/+d7t7ph7rL7virLL7fUwn+',
    'SQOFROPzPj8zPrsoq0TVV+BmVBmhlhBHDCamtIGtjokUeHopEhr12vYyhBFPKtnu/8pHnr4gpc/yS2sMHH2ONy3nsiDa5lL2v/bWkrsd6X7JK8yxH3b6ow1Z',
    'IrH9Sq2xzLPST3mzKPfeYnGi5Vmfsy0B8h/e8ricsoIx9j1dpbf6sKRrhrRsSx87NZPElJ4HRPu/MWa1hYwtV7zxa6cnAslPtqaFWgxFShXc+w2FNETHuNYh',
    '1Hf+k0re5Fso+x12JfAb3L9kqM9RhtV+QjOdQy3l0/snl5fYocSVC+FZ2VZ7N1xM74uKJ5SQsMVS/Wpt+ApHjh/6pm8YxFXWpZP/OoLuZ95FOO88VYtSVpdX',
    'Q4LZSCXHpPeBVdZbHKeRux8CytifV8T4TEyQkyhm7zsu03kqXbT+SdsNISTF6ZoedMtuae2EXQ/k3D9If+kA2mHJujkXdgIAbMrW9hLFYntTU+46ZnLPWlWG',
    'n3zCQ1JOJQhefA+HkY1kXrlQ1mELyObd+goQBYp9Mrfr800wznf+BI/AaXGfkfn2IOPWUNAmg6x71ZDY1951wfKrAgDO4GchejkFUMHzqK8g4za5FZ7o8Dp5',
    'SLQrzfvGP+ZOL33tTLzkVUR/fediIX+stjUAmlT5KvkMbeNqotaMK0W8PV+b9YSYRa9CIQugseugqMQX1aZ4wvVSnIPprlU052nl3LlR66z3e9SXsidZ7ckN',
    '2Yzwh59ixYzHT9fBZwtqg9Jy9UgqwZuYLLEWm1BqJdKhdQ5S2jaUTzcY93lJd9V5xrm3n41m2VKS+U7LoSIJuZ6N38hJ++0kDkVP0NTjOOgWpIJk0Q3Xc3yv',
    'cVBiy/wkLSwWxBneFNriSIOFt+y714T9wuRtnZmN+lnrJ7i8V+63/6AlnJ3OnfLMx55N0n+wn8SVJIC+f4pwrX6jPvrwC7Ef1aR6EZ5WTX+9yb7Pf6yp+fZW',
    'gu9ncrFfLMiNe4XjzSEVSLKHcf4eZxsuOsVo9lh9txNvCiY709Ts73HytUBkOtLUtMNRWSIJE7AnpS7oWQpkS2JYwimV3IJh36Hk3e52z0uL6gDAa8qMdsdt',
    'wQBkbsmefVAYJVnYz/TcgULzYCrAVei5SIIlVaureHMZD2KUX0zd9uHnX9skbUu3J1T6SjZc9anxRy79jv8pUi+TklpicnTFOlYo9Ggo/9HuQm8ehuV0aUka',
    'jEEiHUrPOJeeywW881lno3Ou55NN7cMy3ZIzAf85ZmgmzCCFQhOxXFCSt+VwfhODCTuRKX46xnYWr/v1kcQKVRqdQ3kIzT5pol/oxz0jVYz2ylj4xCTPMAW2',
    'fLJ9sWyGvZOkC4wXfMl7DMkbzjTsw9F+dlsvbPr9uP6Q/CcbWgGhhwpLU/G3wXHRyznkJeotJ5Ns9mi4RrVJ3HDQDIlMgU07q4WVoohuLuUCJhiN9DdohUgN',
    'L5kUT6s64g80AKBfQl+edE/B3YDSZ1SHFGZdlfTwuMGJKWMMexTHlu6b43hd9pK3ZK6mqeSfvq6cZP39CPBZB+sHk+WvVrGYLBJZWSRnwdgDsaW+4FQh+ILs',
    '5nalGIm4B/664/rktoPdcbpERAsstzFqjRGqY6xC+uJr5mn6oOGFhKufrBC5PDs0YTlMOcFUTfqDKaCDT6xmT+FVp+DDpS+kfsbqYufq+g9Rk9qLRW7tyWeM',
    '3C6tXqhzwu5fWCibclVFDKL8wH3UwXHbIqmoxHP8MS30FL5eqz/c88xm+ngKzwUt22Uw109dG+A/cDgXKPDuY0XOzj+s0j3P7+l1FOFNF5hsjBns9g+7wmDz',
    'mxPJH0p0kvkGYreJtG3jTog/RdodABw4ahAjDvFfTluXPVJhlGO4FilTo556Mc0r9bmQ6+y6sfJgqno76u5vrkgPrwoC9d3o07rkAB/8tKf9jmQQeguS4Fgh',
    'FbSqDPJ/gJhjcof1DL85trRx+giJpAvDaoY3dLw69+W91JY6YBDnbeYfHJOGfUxshK/fsJ/U8k89evqHLACrPx7MPZOcgE2uQrVyzaQ0y1K6IA4Ne9PceMnI',
    '+l7nxp1DKUe+EL7j1edlet0wQDr/umRp0HgQRI9VPOCS2sWzPNFP9C8K1jznr35ndDga7wiY0GZucskuvtYqW1zmzOgEYmZVpvRip/uTA6wQYZ3sF/0RRp77',
    'Ep+NUdxg6Heop16MCKXGkfbUIw1O+n0KslDMu6u1oJmrqZ5p1iJjLdoU+k3ZKcoZYno6G//FnOXo5DQJv+4zYjCW85P+ypJ5puD1VupxNhcafxjp+hMWshxy',
    'kkLSqCQMdvYYTAes8IP+pMcw24hZP4PDBHLCsQlFhiiJYS4el7HGKlexwrnbZYZcwEStnuNsYrQ0xoaoRL7vUZhGP3jHaRDEoCtVhtu8q/Sd+caADhd/2AL0',
    'pTyiY9t8Vw6sPbi8BvgJBxlRZksu2Lms+Kqt5pNis27PlDSCyJnSai+W76drIZyeO7LtI3jU1Q1TkMZhVr0Hf2S+BiAh22TetAuDlOR9pyOClpmXNxsg4amH',
    'ij8Fu5REJNkr5/gbnAD4bezHC+m4meeDvQagkf92OhGbZI16PHskAFXfb+xkWLQYMhhTlDEA3Zl2VqMsraAQNubh6uB0USBpmarzJhbM9m/aJX4CIGgsXdd+',
    'CXOsTM4GcYkz7Pd7S3+Ilrf6cxHYEkhf+CiQJ/a5AsBZZT0Zkcz/KVadw1he03H9J85OpzdX/kHcIc5G33nTNJ8W2Nt+TWHsxbx69nPr2cy2UTskI1w0ouIS',
    'ij88iZBr/mTaIAwWtDPHkNn7F0o/HrYlXJr8UJgS1+HwBzbU8cMNwlDLlvTbCSNX1sr+yvu0IBS5tTcw1/9E8j551i1mPM5Tlrl+GOu/N8g7Z5r8hr7BgfD6',
    'reXqwDWTzc+AKkf5XvpKjFD4GDb0sL9cU+Z/ULh48bUIuAAR9L94LKwGcNpFGEKtncKbEXwrdwNvEEVgSv4lBCdXhfTTc0wMTusXhZxkpc5RGtVAtlkfkHQc',
    '7mcOhWFv2zszZVce9v09lKN8pW9VjmI0EF+NNyeD7aNUtO0QLvwLOLFlvqmmxuGTMZwcIEVymcPUAkbvXHukkD5SV9TOXwflCR4MgStwqxB2bo9oKxNCpczv',
    'N7EfuHFOXGQ4pmMOqD1qPuIDrjvLGLkxWOb5+rRD2jEBC3FGkCPzIYnyS1nqigoSdzBMAj8kkP4+KOqLlrLNmTRcFirfhsmay6jA6lveEO93BIQ0eQ9TGXel',
    'jPQf0jIBnK9QAbZe326Sy3fuilus3EeARWSpTcfA2Pd9Jp3r63Nnzg3qxrEKSQakaWQZtpMq6VYE0MkOOSAUm884PDUiJ5j8m2OBcTCOfOv9JKIyPYihb5s+',
    'HMcOuElOsCUr3EFYQqM28+CgDd7OfImxtiEyCP8uVHwuEZN5XyKoge2dRvAa74En0O7NaaDNMsXTA24lKNiYSpv8q29YylXP3PxCBEBwFIK7RW++6Es8dktp',
    '0ihJRCkTcCgNJDCebiAZqb3eF0BrMsTjWD79CRE5XRqXIy6wwUbmNhIi6dMQRzok/IGFcDpLBwyo5du6XOqcF1cEkCOs9f0slFzv6UMM5tTsEs2mRyuQ1mo3',
    'xjHud/B/M8V+fahBV/HXhiDcWPml8a6N/xBA1JLSHleNaKb0LY/Hd4ant0LJTinRFud38Lffc3a+QYA4V02Le4l8ziIxSjm9x5H/rbe909n38PR/cDJsp680',
    'tZnJdrqrSMJ9dqTHcNg9JuM5PGNwWEtMT6s3b5POz+hQFJQ6fFdT6F28xSiaaGJ7VWHyfeWhfrGqqp62SLS02DmVIfuGsattpM60ijYBG8mkypcawq+gEhrO',
    'LM5S9RvUKQXNyb4ao85FPOimReqTeY908A5jNoLgG0sLvA5q6o+lmMgO/xLDBIxqLLieoAAOwB0punfP/3Dm45KifdE/3SW+QnuTlrVnyGSQfdZV6ILvfcRP',
    'YkR7e5kvUXwqelUAr7PT/Qq/5aNRX1vaEYEt7FSQd/hkXQVQMNDeWFj5IKUY1Ou98rnvJt1xJTitBS/Hmgy9Q5AqA+B37AJ4wp9fgEi2PoVvk8H8kld1wIpD',
    '2dq5Iet56ou18fiTO4gzJ9cT9DUzfecWGt97Ir9c0wFpSaVu1vfiVJ5MPn+c/1ReDdX+u9rjBHTD3+FJAKxS3vWN2RvEQfnAJHC4Tg1xuJGMIuICAIEEi+1w',
    'ZRCkU3ovlIrDneS6xyNzyoNJ8Em0dcHyrCgHP770VkpRh4yIOwBPQ8pvJVj+YyoQNBRhtbYwnTSDNqACBVT2rrFe3PLnLPRQsaWHrVzHvfM0ZXif867kv/Kh',
    'x8jxGZywkDosUSqIjo3Y1k2dkiY0lKcun2d8QrjWnXff8TqKa37WZUiRTd0paffLSUvSSuExgFApjYA5S6u8eeHIkyTIPM1p209noQgYlay7uS7cH1/UxV3E',
    'bIpuCt6CFz+aqysdvU0ctzVJmOK5Hi4fBdlIxc12dLuG+vQ0NhoWk2nnXMekXLHPcCzdaD++cA9klDvvQ4Ip9J3dl7itYcXf2BHVXxDNAkcLMYfSrYPk+FbQ',
    'AastIauL3aSHmr7S6xin71N84KrIN29b0k9o37MSLrh7CjI5YWv1u2kPVZVkxhxRf/J38X/vMpxB5v+NGc49UBlW2t+2xGCD7JJ9DqI99CyTHv767296fB7O',
    'p3g0pU3ffGr8Mpp67NiXqtqHPCjBpEChO/G+q4+1pUDYiqhg5sDJPqYATtYtqsO3GWUtkPZM5+GJV9+9tOW2ouv0d/hR5r/RvLfM+uR3qCbofpqBKu+/WzuL',
    'D53tj683HiQByctFlJXCPRakmKjBWuruauxpj1DJo8QUKcv6P9mL7M4RiptESCU9JMkw7y3EqPFF6t6KFBPQu1m9lTmlrUsfo1582bO3QGmISZq8IdGKNQDh',
    'Rf4fnzt+epFlkuWFWf9ZyiLvfeczjWeZ5WRbu0aDj7++cIRpXL6/6tl7Qp8+tkyG9vAHcqJrcR/1VedqzRPpXs+UlETinTOknNTDCxO7MMaZq+cb+nmlHez5',
    'qro50WLbQP3xg71Xt2jPC/lQTa4yTB2Gr8DgH+Qyvm/cH/8z5AirFA6d2mHJvQTAQToJvWn6A0tK3lDBTpUBlfYRuquESmkLGC2Yo45buXLvN0VVumtLRTuk',
    'GjM/DByL0CKR11wAttUyx4VbQpaS8Ie+L9Urk3SkS9/TJrbyN92gg3WN1UtKj+iH2utkaSTLMlWTYrwt/9xSNOv01kd1hg/7jH99T0vlg2N4K9aukkXwACwz',
    'Pv4BhGv6e2OOL+n8wd8pdBKM056x9aRjqCvBvB4YahP7fOC+SaUCS6gUrmhUvlaGc0xzvrx97fsR5MGYTZDhDEda70CwB5f/kPpT9CwJnHD7BW/Qr7+OjLvX',
    '1x5wXdkRncI9OUqd+c9rjAfgJ2gRWm+1ccgzUQjn0zud9gD10DP8aKntb2g13iqk+orBebHTRgN28KpYMKvZt/ruDz3TkMApBWvR/xubal48HkcPpQFu5qn8',
    'tqGcm7aF8vi0xYpcbc/Mqb3UDQanb57P+pJ2OFnG7TmgbQ6EC9QDPVxVzXCXctSyj47OP4Rk38+ikDlDSJE2AfQ6R2p9ERedad1ly/3CNHgr7ghUVAewqQhU',
    '06LqdFC4I/XfWhPuym073faYT1vksZ/VFsB0jrvawyVu5UBSnL/kt9IJ5etT3lFvn1q589QIyLm827rVQUbnPY+8rxVm5b70G2HWTjo1134cvNSOkB/9IcSy',
    'VQt1uuJn+nV+Xm530nVAgTP7Nfcy54+vrCHeTlvFESnoQs4v3oHz/U1Va65hJvV+bOv0rqA0kSaz20qCCg8QakIkmb6ok39Co6GS8Ti5+9QWQpbnKrDKHUhR',
    'hS+S9SutDfomtgep/SK4o6+7j+nPnsByoaRTLXP60pb3ahar9Nf43B986QNvoSDv+2IXM3vcMwdN5aTo9PUTJQ4jyHkaXPEleiYV4v4IHJmY9gj9QIZYALpl',
    'zLOf6rifq1m09BCxlZihoR0+efJDzB0PnWQBF6YjLhVc5xHfQw0MSarE+nV+XtZawmfAvoXd1pDQGlasqgEbkkJrVWHJ+pIGxL/CmjSH0Nski8pkoCLj3or6',
    'DQGyK0xvM8m3e0jCg9CY2apuxdyuN0RbVKwUsLt0faeOP7VlWPea+gh7OOdE9ARx4d1jdj/fVwPJ5/iJuTcCOLlN+GUDDx2cE6UX53P6KCaCbmUGG2vc8imC',
    '6WqfY61wH+SRhzdWoJiHKiGckjpco3kHE4Ey3UM9blFvSDnWE657xlSD94XV5pNouEbk+KHWCn6RLf6qc1jHvLDP0LUrQDvVF7HaXZ6iO4EDWYj9skNkB89W',
    'J3i9xjAAiawl1r5xKltwqy6dy52kNS3l2AYNdFZhg0tKAkB39Ta93dJ+R2bX9R+X7wdNgY/2qoB8mqE+r2Bz/+THvIif7QLwRbdp4Bs99QCaGu5MnDJpopFo',
    'trFOkFM0SDpjSb8lWqIlMmm2vdA7LD2ctSGlmSBmaXe6oDLBkOpOCPAN/6AqBerST5xYaY6wkrfRiyufI9UkUDowbNEHJ/hfxSIuNK+oXv9Ywa5sRrfllsMo',
    'RH+/8dIM2Ur0leD8AkpLtj2fAtteI1iGJnByLmHaqf49CGJwrNj3HB8Gn1E8NoZs46JiBUoUa1xDb35BC3NlBgQC3AwJYBdgKKpdWE0wOlTSEQbl9sfHJWkZ',
    'Rl8EhatnzTufwGWqK8lWtW1fYfpdcicvSh6j2T78UNmW2ze24xLrQP5Gl+YItT8GS4vX0CrUYebQiuw4kKZRw4YZioy3qt+70gAezulf1qjNGz5yT6V7J/ZT',
    'ZpnVbgq5dnDTJ93Jko1PunitBdvkvFeSh8jSqu60N4dypNyXVhbzkcAqRXoVFv2uo4jkydy8OkqXKEGfVsbOnaC5CqVu3i8L1SqqmbP2ifnmhHKFEnbI+Bww',
    'c3rtqdd3Y67lexnVMViJcJh6ZKpX8IZZXX6SPIM02c3Tryv1jmUOh8fpa0LlLbFvN6rE1w1ajuzODDEy8kfPrOhCbqJL9K9sup0FE0eq24GPaitYzAE5WvbJ',
    'TiVdJkUFuJit/OyzXRPJHlmPzP/4Q/RV83RqwFsRXES5LDT5JQEf7VIb97xfQKsRnCTyydl1X6FkvugILxDy45ypmsvcgMC40VM9TtVjwYU6SyA9Xec92vaA',
    'FbEi1NP2cZi/VIOvsAdWNmvJtDtleQaClcOgdVXct5P/YUDZp6qUflaCf6eMqq01Way1ZrFFo0EOS3iZqVO5Xs6TUVSuajINT59bA67FR/0s3vD0KnodCjvW',
    'vbOsZQJ/4Y+9lrlseD5hUrlUBlB6rf95O7s82X3Ond88AVMTbxx6wryLPM7SiDr1bJKAyfI8ywK6kddLtp343kFhWg0BDBDsZ7r418DZsxli+DtKN1PRJxn5',
    'SDF9Hg5eDoNgYEEoWHh004jfUkEAxry25YCjMoN+Do+ZPDA4q4hvRqKM+WRGc1SoaawQM8WKh7gorJ0T08k7BlL1ml+y6gcfQld4fpaFKhHjZ5nHWTJKA4Oy',
    'hu5Xhgcs0SUuqly1I8TnUVdeFookeFgMOYEuU5jimmneEHwDLQURXKsQg5n47VawGfumpDd671vsCW8SGbOQYfEJuZYMXa2WdcI9kt20v0SAOUjmfFhXf2+d',
    'v2Hy/DcZki0/EetGjuyDbIZtBkkOhV76JvT0jHAz6IznG4RV8sLrAyq04HwP6PyHf7rJt59e3z4/5igI3NKaLWQvfont0zbtXa62G9jb1bXXDaBLtwa65pXN',
    'Ws4eG1LEDuQvpPT387yd2v9fB6EpEtGe/DPSkcyXBAAA9ICSQxUQAEwHAEwHAAAAQAAAAoAW4AlVQJURXBAA+whRGlkU'
  ].join('').split('').reverse().join('');
  const N = 4, SIZE = 288, T = SIZE / N;
  let sprite;
  const load = () => sprite || (sprite = new Promise(ok => {
    const im = new Image(); im.onload = () => ok(im); im.src = 'data:image/webp;base64,' + D;
  }));
  const block = e => e.preventDefault();
  const put = () => document.querySelectorAll('#manifesto .stamp').forEach(el => {
    if (el.dataset.sfSeal) return;
    el.dataset.sfSeal = '1';
    const box = document.createElement('span');
    box.className = 'sf-seal';
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', 'مهر مؤسسه سفیران');
    const cv = document.createElement('canvas');
    cv.width = cv.height = SIZE;
    box.append(cv, Object.assign(document.createElement('span'), { className: 'sf-seal-shield' }));
    ['contextmenu', 'dragstart', 'selectstart', 'copy'].forEach(t => box.addEventListener(t, block));
    el.style.display = 'none';
    el.after(box);
    load().then(im => {
      const g = cv.getContext('2d');
      ORDER.forEach((src, dst) => g.drawImage(im, (dst % N) * T, Math.floor(dst / N) * T, T, T,
                                                (src % N) * T, Math.floor(src / N) * T, T, T));
    });
  });
  const st = document.createElement('style');
  st.textContent = `.sf-seal{position:relative;display:inline-block;width:132px;height:132px;transform:rotate(-8deg);
    mix-blend-mode:multiply;opacity:.92;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
  .sf-seal canvas{width:100%;height:100%;display:block;pointer-events:none}
  .sf-seal-shield{position:absolute;inset:0}
  @media (max-width:640px){.sf-seal{width:112px;height:112px}}`;
  document.head.appendChild(st);
  let q;
  new MutationObserver(() => { clearTimeout(q); q = setTimeout(put, 150); })
    .observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('load', put);
  put();
})();
