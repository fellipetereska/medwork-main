import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import OpenSansLight from '../../../media/fonts/OpenSans-Light.ttf';
import OpenSansRegular from '../../../media/fonts/OpenSans-Regular.ttf';
import OpenSansMedium from '../../../media/fonts/OpenSans-Medium.ttf';
import OpenSansSemiBold from '../../../media/fonts/OpenSans-SemiBold.ttf';
import OpenSansBold from '../../../media/fonts/OpenSans-Bold.ttf';
import OpenSansExtraBold from '../../../media/fonts/OpenSans-ExtraBold.ttf';

function PdfGenerate({
  inventario, plano,
  company, unidades, setores, cargos, contatos,
  processos, riscos, medidasAdm, medidasEpi, medidasEpc,
  user, aparelhos, data, versao, pdfVersion,
}) {

  const findSetor = (item) => {
    const findSetor = setores.find((i) => i.id_setor === item);
    return findSetor ? findSetor.nome_setor : "N/A";
  };

  const getTotalFuncMasc = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_masc, 0);
  };

  const getTotalFuncFem = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_fem, 0);
  };

  const getTotalFuncMenor = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_menor, 0);
  };

  const getTotalFunc = () => {
    const funcMasc = cargos.reduce((total, cargo) => total + cargo.func_masc, 0);
    const funcFem = cargos.reduce((total, cargo) => total + cargo.func_fem, 0);
    const funcMenor = cargos.reduce((total, cargo) => total + cargo.func_menor, 0);

    return funcMasc + funcFem + funcMenor;
  };

  const find = (item, tipo) => {
    try {
      if (!item) {
        return 'N/A';
      }

      switch (tipo) {
        case 'nome_unidade':
          const unidadeEncontrada = unidades.find((c) => c.id_unidade === item);
          return unidadeEncontrada ? unidadeEncontrada.nome_unidade : 'N/A';

        case 'nome_setor':
          const setorEncontrado = setores.find((c) => c.id_setor === item);
          return setorEncontrado ? setorEncontrado.nome_setor : 'N/A';

        case 'nome_processo':
          const processoEncontrado = processos.find((c) => c.id_processo === item);
          return processoEncontrado ? processoEncontrado.nome_processo : 'N/A';

        case 'nome_aparelho':
          const aparelhosEncontrado = aparelhos.find((c) => c.id_aparelho === item);
          const aparelho = `${aparelhosEncontrado.nome_aparelho} - ${aparelhosEncontrado.marca_aparelho} (${formatData(aparelhosEncontrado.data_calibracao_aparelho)})`
          return aparelho;

        case 'nome_risco':
        case 'grupo_risco':
        case 'consequencia':
        case 'avaliacao':
        case 'limite_tolerancia':
        case 'metodologia':
        case 'severidade':
        case 'unidade_medida':
          const riscoEncontrado = riscos.find((c) => c.id_risco === item);
          if (riscoEncontrado) {
            switch (tipo) {
              case 'nome_risco':
                return riscoEncontrado.nome_risco || "N/A";
              case 'grupo_risco':
                return riscoEncontrado.grupo_risco || "N/A";
              case 'consequencia':
                return riscoEncontrado.danos_saude_risco || "N/A";
              case 'avaliacao':
                return riscoEncontrado.classificacao_risco || "N/A";
              case 'limite_tolerancia':
                return riscoEncontrado.limite_tolerancia_risco || "0";
              case 'metodologia':
                return riscoEncontrado.metodologia_risco || "N/A";
              case 'severidade':
                return riscoEncontrado.severidade_risco || "N/A";
              case 'unidade_medida':
                return riscoEncontrado.unidade_medida_risco;
            }
          } else {
            return 'N/A';
          }
        default:
          return 'N/A';
      }
    } catch (error) {
      console.log("Erro ao buscar Dados!", error);
      return 'N/A';
    }
  };

  const formatData = (item) => {
    try {
      const data_formatada = new Date(item).toLocaleDateString('pr-BR');
      return data_formatada || 'N/A';
    } catch (error) {
      console.log("Erro ao formatar data!", error);
    }
  };

  const convertMedidas = (item) => {
    try {
      const medidasArray = JSON.parse(item);
      return medidasArray.map(({ nome, tipo }) => `${tipo}: ${nome}`).join('\n');
    } catch (error) {
      console.error("Erro ao converter medidas:", error);
      return 'N/A';
    }
  };

  const convertProbSev = (item) => {
    try {
      switch (item) {
        case 1:
          return "Muito Baixa";
        case 2:
          return "Baixa";
        case 3:
          return "Média";
        case 4:
          return "Alta";
        case 5:
          return "Muito Alta";
        default:
          return "N/A";
      }
    } catch (error) {
      console.log("Erro ao converter Probabilidade/Severidade!", error);
    }
  };

  const convertNivel = (item) => {
    try {
      if (item >= 1 && item <= 6) {
        return "Baixo";
      } else if (item >= 8 && item <= 12) {
        return "Moderado"
      } else if (item >= 15 && item <= 16) {
        return "Alto"
      } else if (item >= 19) {
        return "Crítico"
      } else {
        return "N/A"
      }
    } catch (error) {
      console.log("Erro ao converter Nível!", error);
    }
  };

  const findMedidas = (medida, tipo) => {
    try {
      switch (tipo) {
        case 1:
          const filterMedidaAdm = medidasAdm.find((i) => i.id_medida_adm === medida);
          return filterMedidaAdm.descricao_medida_adm;
        case 2:
          const filterMedidaEpi = medidasEpi.find((i) => i.id_medida === medida);
          const medidaEpi = `${filterMedidaEpi.nome_medida} - ${filterMedidaEpi.certificado_medida} (${filterMedidaEpi.vencimento_certificado_medida})`
          return medidaEpi;
        case 3:
          const filterMedidaEpc = medidasEpc.find((i) => i.id_medida === medida);
          return filterMedidaEpc.descricao_medida;
        default:
          break;
      }
    } catch (error) {
      console.error("Erro ao buscar medida!", error)
    }
  };

  const findTipo = (tipo) => {
    try {
      switch (tipo) {
        case 1:
          return "Adm"
        case 2:
          return "Epi"
        case 3:
          return "Epc"
        default:
          break;
      }
    } catch (error) {
      console.error("Erro ao filtrar tipo de medida", error)
    }
  };

  const getColor = (item) => {
    try {
      switch (item) {
        case 1:
          return '#d8f3dc'
        case 2:
          return '#caf0f8'
        case 3:
          return '#fff6cc'
        case 4:
          return '#ffc971'
        case 5:
          return '#fcb9b2'
        case 0:
          return '#e9ecef'
        default:
          return '#e9ecef'
      }
    } catch (error) {
      console.log("Erro ao modificar cor de fundo!", error)
    }
  };

  const getColorStatus = (item) => {
    try {
      switch (item) {
        case 'Não Realizado':
          return '#ffc971'
        default:
          return '#e9ecef'
      }
    } catch (error) {
      console.log("Erro ao modificar cor de fundo!", error)
    }
  };

  const getColorNivel = (item) => {
    try {
      if (item >= 1 && item <= 6) {
        return "#d8f3dc";
      } else if (item >= 8 && item <= 12) {
        return "#fff6cc"
      } else if (item >= 15 && item <= 16) {
        return "#ffc971"
      } else if (item >= 19) {
        return "#fcb9b2"
      } else {
        return "#e9ecef"
      }
    } catch (error) {
      console.log("Erro ao converter Nível!", error);
    }
  };

  const setVigencia = (item) => {
    try {
      const dataCalculada = new Date(item);

      dataCalculada.setFullYear(dataCalculada.getFullYear() + 2);
      return formatData(dataCalculada);
    } catch (error) {
      console.log("Erro ao calcular data", error)
    }
  };


  Font.register({ family: 'OpenSansLight', src: OpenSansLight });
  Font.register({ family: 'OpenSansRegular', src: OpenSansRegular });
  Font.register({ family: 'OpenSansMedium', src: OpenSansMedium });
  Font.register({ family: 'OpenSansSemiBold', src: OpenSansSemiBold });
  Font.register({ family: 'OpenSansBold', src: OpenSansBold });
  Font.register({ family: 'OpenSansExtraBold', src: OpenSansExtraBold });


  const PageStyles = StyleSheet.create({
    pageCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 10,
      height: '100%',
    },

    Page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 10,
      height: '100%',
    },

    LandscapePage: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 10,
      paddingVertical: 10,
      height: '100%',
    },

    coverPage: {
      backgroundColor: '#ad2831',
      padding: 10,
      color: '#fff',
    },
  });

  const TextStyles = StyleSheet.create({
    headerText: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 5,
      paddingTop: 10,
      fontFamily: 'OpenSansBold',
    },

    topText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },

    centerText: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'OpenSansExtraBold',
    },

    SignatureDate: {
      fontSize: 10,
      textAlign: 'left',
      color: '#343a40',
      fontFamily: 'OpenSansLight',
    },

    officeText: {
      fontSize: 12,
      fontFamily: 'OpenSansRegular',
    },

    officeSmallText: {
      fontSize: 10,
      color: '#6c757d',
      fontFamily: 'OpenSansLight',
    },

    smallText: {
      fontSize: 12,
    },

    littleText: {
      fontSize: 10,
      textAlign: 'center',
      fontFamily: 'OpenSansRegular',
    },

    smallTextVigencia: {
      fontSize: 10,
    },

    subTitleSumary: {
      fontSize: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      fontFamily: 'OpenSansBold',
    },

    subSubTitleSumary: {
      fontSize: 12,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginLeft: 10,
      marginTop: 10,
    },

    prefixText: {
      fontSize: 8,
      color: '#6c757d',
      marginRight: 5,
      fontFamily: 'OpenSansLight',
    },

    prefixTextTitle: {
      fontSize: 8,
      color: '#ced4da',
      marginRight: 5,
      fontFamily: 'OpenSansLight',
    },

    valueText: {
      fontSize: 12,
      color: '#495057',
      fontFamily: 'OpenSansRegular',
    },

    valueTextTitle: {
      fontSize: 14,
      color: '#f8f9fa',
      fontFamily: 'OpenSansMedium',
    },

    valueTextSignatureTitle: {
      fontSize: 12,
      color: '#f8f9fa',
      fontFamily: 'OpenSansBold',
    },

    footerText: {
      fontSize: 10,
      textAlign: 'center',
      marginTop: 5,
      fontFamily: 'OpenSansBold',
    },

    footerAddresText: {
      fontSize: 10,
      textAlign: 'center',
      marginTop: 2,
      color: '#6c757d',
      fontFamily: 'OpenSansLight',
    },

    title: {
      fontSize: 11,
      marginTop: 10,
    },

    paragraph: {
      fontSize: 10,
      textAlign: 'justify',
      textTransform: 'none',
      marginBottom: 10,
      fontFamily: 'OpenSansRegular',
    },
  });

  const ContainerStyles = StyleSheet.create({
    headerContainer: {
      width: '100%',
      borderBottom: '1 solid #e5e5e5',
      marginBottom: 20,
    },

    centerContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },

    bottomContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    bottomContainerVigencia: {
      marginTop: 'auto',
      width: '100%',
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    signatureContainer: {
      width: '100%',
      marginTop: 50,
    },

    footerContainer: {
      marginTop: 'auto',
      width: '100%',
      borderTop: '1 solid #e5e5e5',
    },

    textContainer: {
      marginTop: 10,
      marginLeft: 10,
    },
  });

  const TableStyles = StyleSheet.create({
    table: {
      marginTop: 10,
      width: '100%',
    },

    headerCell: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#0077b6',
      width: '100%',
    },

    headerTable: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#0077b6',
      width: '100%',
      flexDirection: 'row',
    },

    headerCellTable: {
      width: '33%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    tableRow: {
      borderBottom: '1 solid #343a40',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
    },

    seventyFiveRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '75%',
    },

    fiftyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '50%',
    },

    fortyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '40%',
    },

    twentyFiveRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '25%',
    },

    twentyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '20%',
    },

    fifTeenRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '15%',
    },

  });

  const HeaderPage = () => {
    return (
      <View style={ContainerStyles.headerContainer}>
        <Text style={TextStyles.headerText}>PGR - Programa de Gerenciamento de Riscos - NR1</Text>
        <Text style={TextStyles.littleText}>{company.nome_empresa} - Versão: {versao ? versao : '1'}</Text>
      </View>
    );
  }

  const FooterPage = () => {
    return (
      <View style={ContainerStyles.footerContainer}>
        <Text style={TextStyles.footerText}>{company.nome_empresa}</Text>
        <Text style={TextStyles.footerAddresText}>Rua Goias, 1914 - apto 301 - Londrina/PR 86020-410</Text>
      </View>
    );
  }

  const CoverPage = () => {
    return (
      <Page size="A4" style={PageStyles.Page}>
        <Text style={TextStyles.headerText}>Programa de Gerenciamento de Riscos - PGR</Text>
        <View style={ContainerStyles.centerContainer}>
          <Text style={TextStyles.centerText}>{company.nome_empresa}</Text>
        </View>
        <View style={ContainerStyles.bottomContainerVigencia}>
          <Text style={TextStyles.smallTextVigencia}>Londrina, {formatData(data)} - Vigência: {setVigencia(data)}</Text>
        </View>
      </Page>
    )
  };

  const SumaryPage = () => {
    return (
      <Page size="A4" style={PageStyles.pageCenter}>
        <HeaderPage />
        <Text style={TextStyles.topText}>Sumário</Text>
        <FooterPage />
      </Page>
    );
  };

  const VersionTable = () => {

    const RiskInventoryStyles = StyleSheet.create({
      headerRow: {
        gap: 2,
        paddingHorizontal: 3,
        paddingVertical: 3,
        backgroundColor: '#0077b6',
        flexDirection: 'row',
        color: '#f8f9fa',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      dataRow: {
        paddingHorizontal: 3,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
      },

      headerCellCenter: {
        textAlign: 'center',
        fontSize: 10,
        width: '15%',
        fontFamily: 'OpenSansBold',
      },

      headerCell: {
        textAlign: 'center',
        fontSize: 10,
        width: '45%',
        fontFamily: 'OpenSansBold',
      },

      dataCell: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        textAlign: 'left',
        flexDirection: 'row',
        fontSize: 10,
        width: '45%',
        fontFamily: 'OpenSansRegular',
      },

      dataCellCenter: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        textAlign: 'center',
        fontSize: 10,
        width: '15%',
        fontFamily: 'OpenSansRegular',
      },

    });

    return (
      <Page style={PageStyles.Page}>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>1. Versões do Laudo</Text>

        {/* Versões */}
        <View style={TableStyles.table}>
          <View style={RiskInventoryStyles.headerRow}>
            <Text style={RiskInventoryStyles.headerCellCenter}>ID</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Versão</Text>
            <Text style={RiskInventoryStyles.headerCell}>Empresa</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Data</Text>
          </View>
          {pdfVersion.map((item, i) => (
            <View key={i} style={RiskInventoryStyles.dataRow}>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.id_versao || ''}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.versao}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{company.nome_empresa}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{formatData(item.data)}</Text>
            </View>
          ))}
        </View>

        <FooterPage />

      </Page>
    );
  };

  const CompanyPage = () => {

    const CompanyStyles = StyleSheet.create({
      officeFiftyRow: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      headerSignatureContentCell: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
      },

      headerSignatureCell: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      signatureLine: {
        height: '20%',
        borderBottom: '1 solida #343a40'
      },

    });

    return (
      <Page style={PageStyles.Page}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>2. Identificação da Empresa</Text>

        {/* Company Table */}
        <View style={TableStyles.table}>
          <View style={TableStyles.headerCell}>
            <Text style={TextStyles.prefixTextTitle}>Empresa: </Text>
            <Text style={TextStyles.valueTextTitle}>{company.nome_empresa || "N/A"}</Text>
          </View>
          <View style={TableStyles.tableRow}>
            <View style={TableStyles.twentyFiveRow}>
              <Text style={TextStyles.prefixText}>CNPJ:</Text>
              <Text style={TextStyles.valueText}>{company.cnpj_empresa || "N/A"}</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Cnae:</Text>
              <Text style={TextStyles.valueText}>{company.cnae_empresa || "0"}</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Grau de Risco:</Text>
              <Text style={TextStyles.valueText}>{company.grau_risco_cnae || "0"}</Text>
            </View>
            <View style={TableStyles.fiftyRow}>
              <Text style={TextStyles.prefixText}>Descrição CNAE:</Text>
              <Text style={TextStyles.valueText}>Serviços de manutenção e reparação mecânica de veículos automotores</Text>
            </View>
          </View>
        </View>

        {/* Signature Table */}
        <View style={ContainerStyles.signatureContainer}>
          <Text style={TextStyles.SignatureDate}>Londrina, {formatData(data)}</Text>

          {/* Assinatura do Técnico */}
          <View style={TableStyles.table}>
            <View style={CompanyStyles.headerSignatureContentCell}>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Elaborador</Text>
              </View>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Assinatura</Text>
              </View>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={CompanyStyles.officeFiftyRow}>
                <Text style={TextStyles.officeText}>{user.nome_usuario}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <View style={CompanyStyles.signatureLine}></View>
              </View>
            </View>
          </View>

          {/* Signature Table */}
          <View style={TableStyles.table}>
            <View style={CompanyStyles.headerSignatureContentCell}>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Responsável</Text>
              </View>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Assinatura</Text>
              </View>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={CompanyStyles.officeFiftyRow}>
                <Text style={TextStyles.officeText}>{contatos.nome_contato}</Text>
                <Text style={TextStyles.officeSmallText}>{contatos.email_contato}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <View style={CompanyStyles.signatureLine}></View>
              </View>
            </View>
          </View>

        </View>

        {/* Footer */}
        <FooterPage />

      </Page>
    );
  };

  const IntroductionPage = () => {

    const styles = StyleSheet.create({
      page: {
        padding: 20,
      },

      textContainer: {
        marginTop: 10,
        marginLeft: 10,
      },

      listItem: {
        flexDirection: 'row',
        marginBottom: 5,
      },

      bullet: {
        width: 10,
        marginRight: 5,
      },

      listItemText: {
        flex: 1,
        fontSize: 9,
        textAlign: 'justify',
        fontFamily: 'OpenSansLight',
      },

      textContainer: {
        marginTop: 20,
        marginBottom: 20,
      }
    });

    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>3. Introdução</Text>

        <View style={styles.textContainer}>
          <Text style={TextStyles.paragraph}>
            Este Documento foi elaborado de acordo com as diretrizes da NR 1, Portaria SEPRT nº 6.730, de 9 de março de 2020, DOU 12/03/20.
          </Text>

          <Text style={TextStyles.paragraph}>
            O GRO (Gerenciamento de Riscos Ocupacionais) deve constituir o PGR (Programa de Gerenciamento de Riscos), deve contemplar ou estar integrado com planos, programas e outros documentos previstos na legislação de segurança e saúde no trabalho e faz parte de um conjunto de medidas mais amplas contidas nas demais normas regulamentadoras, o qual se articula, principalmente, com a NR 07, PCMSO (Programa de Controle Médico de Saúde Ocupacional).
          </Text>

          <Text style={TextStyles.paragraph}>
            Este Documento contém o Inventário Geral dos Riscos relacionados às atividades existentes na empresa, compreendendo todas as categorias de riscos à segurança e saúde dos trabalhadores e constitui um dos documentos básicos do Programa de Gestão de Riscos, no que diz respeito ao reconhecimento e avaliação de riscos relacionados a agentes físicos, químicos, biológicos, ergonômicos e mecânicos.
          </Text>

          <Text style={TextStyles.paragraph}>
            Atende às exigências da Norma Regulamentadora 09, no que diz respeito ao reconhecimento e avaliação de riscos relacionados a agentes químicos, físicos e biológicos.
          </Text>

          <Text style={TextStyles.paragraph}>
            Atende as exigências da Norma Regulamentadora 17 - Ergonomia, indicando situações nas quais se faz necessário a realização de Análise Ergonômica do Trabalho complementares.
          </Text>

          <Text style={TextStyles.paragraph}>
            Os dados constantes neste documento servem de base para a elaboração do Plano de Ação Anual de Segurança e Saúde do Trabalho, que contempla as ações de controle a serem mantidas, implementadas ou melhoradas, assim como as atividades de monitoramento das exposições.
          </Text>

          <Text style={TextStyles.paragraph}>
            Os riscos identificados para cada grupo de Grupo de Trabalhadores irão subsidiar a elaboração ou reformulação do PCMSO (Programa de Controle Médico de Saúde Ocupacional).
          </Text>
        </View>

        <Text style={TextStyles.subTitleSumary}>4. Objetivos</Text>

        <View style={styles.textContainer}>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>Caracterizar exposições a todas as condições perigosas e aos agentes potencialmente
              nocivos - químicos, físicos, biológicos e outros fatores estressores que constituem cargas de trabalho
              física e mental significativas;</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>Caracterizar a intensidade e a variação temporal das exposições para todos os
              trabalhadores próprios e de contratadas que atuem em atividades dentro dos limites da empresa;
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>Avaliar os riscos potenciais à segurança e saúde de todos os trabalhadores;</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>Priorizar e recomendar ações para controlar exposições que representem riscos
              inaceitáveis e intoleráveis;
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>Registrar as avaliações ambientais realizadas na empresa;
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>Comunicar os resultados do processo de levantamento de perigos e avaliação de riscos
              para todos os trabalhadores envolvidos;
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>Manter o registro histórico das exposições para todos os trabalhadores de forma que
              problemas futuros de saúde possam ser analisados e gerenciados com base em informações reais de
              exposição;
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>Manter o registro histórico das exposições para todos os trabalhadores de forma que
              problemas futuros de saúde possam ser analisados e gerenciados com base em informações reais de
              exposição.
            </Text>
          </View>
        </View>

        <FooterPage />
      </Page>

    );
  };

  const AbrangencePage = () => {

    const AbrangenceStyles = StyleSheet.create({
      row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1 solida #495057',
      },

      cellTitle: {
        flex: 1,
        width: '30%',
        backgroundColor: '#0077b6',
        color: '#ffffff',
        padding: 5,
        fontSize: 12,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'OpenSansBold',
      },

      cellBody: {
        width: '70%',
        flex: 2,
        padding: 5,
        fontSize: 9,
        textAlign: 'justify',
        fontFamily: 'OpenSansRegular',
      },
    });

    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>5. Abrangência</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>
            Este Programa abrangerá os riscos identificados no ambiente de trabalho da empresa, conforme
            estabelecido na NR 1 da Portaria 3214/78.
          </Text>

          <Text style={TextStyles.paragraph}>
            O processo se inicia com a caracterização básica de cada unidade - processo e ambiente de
            trabalho, força de trabalho e agentes ambientais e estressores. Esses dados servem de base para definir
            os grupos homogêneos de exposição (GHE) e atividades não rotineiras ou de empresas contratadas,
            para os quais os riscos serão reconhecidos e avaliados.
          </Text>

          <View style={TableStyles.table}>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>FÍSICOS</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>ruído, vibrações, temperaturas anormais, pressões anormais, radiações ionizantes, radiações não ionizantes e umidade, entre outros.</Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>QUÍMICOS</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>névoa, neblinas, poeiras, fumos, gase, vapores, entre outros. Considerando o tipo de exposição e os resultados da avaliação quantitativa, através da varredura de múltiplos compostos, quando o agente em questão está precedido do sinal "&lt;", ou seja, abaixo do limite de quantificação, significa "a menor quantidade que um procedimento de análise consegue medir com confiabilidade estatística". Assim, de acordo com o laboratório de análises não existe o "zero absoluto" para qualquer tipo de agente mensurado, portanto, conclui-se tecnicamente que o agente não obteve a menor concentração necessária para sua avaliação, considerando assim, a inexistência do agente no ambiente de trabalho para fins de classificação de perigo/risco/agente nocivo.</Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>BIOLÓGICOS</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>bactérias, fungos, protozoários, vírus, entre outros.</Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>MECÂNICOS</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>São potencialmente geradores de acidentes, como o arranjo físico
                  deficiente; máquinas e equipamentos sem proteção; ferramentas inadequadas; ou defeituosas;
                  eletricidade; incêndio ou explosão; animais peçonhentos; armazenamento inadequado, dentre outros.</Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>ERGONÔMICOS</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>são todas as condições que afetam o bem-estar do indivíduo,
                  sejam elas físicas, mentais ou organizacionais. Podem ser compreendidas como fatores que interferem
                  nas características psicofisiológicas do profissional, provocando desconfortos e problemas de saúde. São
                  exemplos de riscos ergonômicos: levantamento de peso, ritmo excessivo de trabalho, monotonia,
                  repetitividade, postura inadequada.</Text>
              </View>
            </View>
          </View>
        </View>

        <FooterPage />
      </Page>

    );
  };

  const DefinePage = () => {

    const AbrangenceStyles = StyleSheet.create({
      row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1 solida #495057',
      },

      cellTitle: {
        flex: 1,
        width: '30%',
        backgroundColor: '#0077b6',
        color: '#ffffff',
        padding: 5,
        fontSize: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'OpenSansBold',
      },

      cellBody: {
        width: '70%',
        flex: 2,
        padding: 5,
        fontSize: 8,
        textAlign: 'justify',
        fontFamily: 'OpenSansRegular',
      },
    });

    return (
      <Page style={PageStyles.Page}>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>6. Definições</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>
            Este Programa abrangerá os riscos identificados no ambiente de trabalho da empresa, conforme
            estabelecido na NR 1 da Portaria 3214/78.
          </Text>

          <Text style={TextStyles.paragraph}>
            O processo se inicia com a caracterização básica de cada unidade - processo e ambiente de
            trabalho, força de trabalho e agentes ambientais e estressores. Esses dados servem de base para definir
            os grupos homogêneos de exposição (GHE) e atividades não rotineiras ou de empresas contratadas,
            para os quais os riscos serão reconhecidos e avaliados.
          </Text>

          <View style={TableStyles.table}>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>Dano</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text> É a consequência de um perigo em termos de lesão, doença, ou uma combinação desses. </Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>Perigo</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>Fonte, situação ou ato com potencial para provocar danos humanos em termos de lesão, ou uma combinação dessas.</Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>Identificação de Perigos</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>Processo de reconhecimento que um perigo existe, e de definição de suas características</Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>Risco</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>São potencialmente geradores de acidentes, como o arranjo físico
                  deficiente; máquinas e equipamentos sem proteção; ferramentas inadequadas; ou defeituosas;
                  eletricidade; incêndio ou explosão; animais peçonhentos; armazenamento inadequado, dentre outros.</Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>Avaliação de Riscos</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>Processo de avaliação de risco proveniente de perigo, levando em consideração a adequação de qualquer controle existente, e decidindo se o risco é ou não aceitável.
                </Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>Risco Aceitável</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>Risco que foi reduzido a um nível que pode ser tolerado pela empresa, levando em consideração suas obrigações legais e sua própria política de SST.
                </Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>Estimativa de Risco</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>Processo para determinar a frequência ou a probabilidade e as consequências de um perigo
                </Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>Nível de Ação - N.A</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>Corresponde a um valor a partir do qual devem ser iniciadas medidas
                  preventivas de forma a minimizar a probabilidade de que as exposições à agentes ambientais ultrapasse
                  os limites de tolerância. Agentes Químicos + 50% do LT (limite de tolerância), Ruído= dose 0,5.
                </Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>Limite de Tolerância - L.T</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>Concentração ou intensidade máxima ou mínimas,
                  relacionadas à natureza e o tempo de exposição ao agente, que não causará danos à saúde do trabalho,
                  durante sua vida laboral (item 15.1.5 da NR 15, Portaria 3214).
                </Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>Valor Teto</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>Concentração que não pode ser excedida durante nenhum momento da exposição do trabalhador.
                </Text>
              </View>
            </View>
            <View style={AbrangenceStyles.row}>
              <View style={AbrangenceStyles.cellTitle}>
                <Text>Grupo Homogêneo de Exposição (GHE)</Text>
              </View>
              <View style={AbrangenceStyles.cellBody}>
                <Text>A “Caracterização Básica” é um conceito
                  presente nas Estratégias de Amostragem da AIHA, e representa um processo inicial de conhecimentos,
                  em Higiene Ocupacional, que vai permitir a estruturação das amostragens para todos os trabalhadores
                  da empresa.
                  Trata-se de conhecer as três vertentes da questão: os ambientes de trabalho, os Grupo de
                  Trabalhadores e os agentes ambientais. A partir desse estudo integrado, o profissional responsável pelos
                  levantamentos será capaz de definir a unidade de trabalho, que são os grupos exposição similar – GES.
                  Ou seja, depois de observar e conhecer as exposições, reunir os trabalhadores em grupos que
                  possuem as mesmas chances de exposição a um dado agente. Essa “igualdade” provém do
                  desenvolvimento de rotinas e tarefas essencialmente idênticas ou similares do ponto de vista da
                  exposição.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <FooterPage />
      </Page>

    );
  };

  const StrategyPage = () => {

    const styles = StyleSheet.create({
      page: {
        padding: 20,
      },

      listItem: {
        flexDirection: 'row',
        marginBottom: 5,
      },

      bullet: {
        width: 10,
        marginRight: 5,
      },

      listItemText: {
        flex: 1,
        fontSize: 9,
        textAlign: 'justify',
        fontFamily: 'OpenSansLight',
      },

      textContainer: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
      },
    });

    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>7. Estratégia e Metodologia de Ação</Text>
        <Text style={TextStyles.paragraph}>A estratégia e metodologia de ação visam garantir a adoção de medidas de controle nos
          ambientes de trabalho para a efetiva proteção dos trabalhadores, obedecendo hierarquicamente</Text>

        <View style={styles.textContainer}>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Eliminação ou redução da utilização ou formação de agentes prejudiciais à saúde ou à
              integridade física dos trabalhadores;
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Prevenção do aparecimento, liberação ou disseminação de agentes prejudiciais à saúde
              no ambiente de trabalho;
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Redução dos níveis ou concentração de agentes prejudiciais à saúde no ambiente de
              trabalho;
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Treinamento aos trabalhadores informando-os sobre a agressividade dos riscos
              identificados (físicos, químicos, biológicos, mecânicos/acidentes e ergonômicos).
            </Text>
          </View>
        </View>

        <Text style={TextStyles.subTitleSumary}>8. Levantamento Preliminar de Perigos</Text>

        <View style={styles.textContainer}>
          <Text style={TextStyles.paragraph}>
            O responsável da empresa deverá assegurar que toda modificação e/ou novo projeto a ser implantado seja avaliado preliminarmente com relação a identificação de perigos e avaliação dos riscos potencialmente presentes.
          </Text>

          <Text style={TextStyles.paragraph}>
            O levantamento preliminar de perigos é realizado através da análise dos processos existentes ou futuros, visita de campo, bem como, estudos técnicos e epidemiológicos, notas técnicas, publicações e outros materiais relacionados com o processo/atividade envolvido. Neste levantamento preliminar de riscos poderão ser utilizados documentos técnicos, programas ou laudos elaborados anteriormente, para os processos já existentes, com objetivo de comparar a evolução da classificação e nível do risco, bem como, acompanhar a eficácia das medidas existentes.
          </Text>

          <Text style={TextStyles.paragraph}>
            Quando o risco não puder ser evitado na fase de levantamento preliminar serão seguidas as
            etapas de identificação de perigos e avaliação de riscos. Importante: Os setores constantes no inventário
            de riscos - descrição de atividades e cargos e que não constarem na matriz de risco serão classificados
            como: Ausência de Agente Nocivo
          </Text>
        </View>

        <FooterPage />
      </Page>

    );
  };

  const RiskIdentificationPage = () => {

    const styles = StyleSheet.create({
      page: {
        padding: 20,
      },

      listItem: {
        flexDirection: 'row',
        marginBottom: 5,
      },

      bullet: {
        width: 10,
        marginRight: 5,
      },

      listItemText: {
        flex: 1,
        fontSize: 9,
        textAlign: 'justify',
        fontFamily: 'OpenSansLight',
      },

      textContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
      }
    });

    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>9. Identificação de Perigos</Text>

        <View style={styles.textContainer}>
          <Text style={TextStyles.paragraph}>
            Para elaboração do reconhecimento foi realizada a caracterização de todos os trabalhadores: nome, cargo, função na empresa, atividades que realizam, setores onde estão lotados, datas de admissão no setor, regime de revezamento, com o objetivo de estudar como eles se relacionam com os processos e com os agentes /perigos presentes nestes processos e no ambiente.
          </Text>

          <Text style={TextStyles.paragraph}>
            Para cada setor da empresa então é feito um mapeamento dos processos e atividades existentes com o objetivo de identificar os grupos de trabalhadores que realizam atividades similares visando facilitar a identificação de perigos na empresa. A estes grupos de trabalhadores damos o nome de GES.
          </Text>

          <Text style={TextStyles.paragraph}>
            Cada processo pode ser constituído de um ou mais GES, isto será determinado levando-se em conta a similaridade de cada atividade realizada e consequentemente quanto a exposição aos mesmos perigos
          </Text>

          <Text style={TextStyles.paragraph}>
            Em seguida caracteriza-se o ambiente de trabalho para cada GES: setor (local físico onde realiza suas atividades), verificando-se as condições sanitárias, iluminação, ventilação, estado de conservação, etc
          </Text>

          <Text style={TextStyles.paragraph}>
            Para cada GES então é realizado a identificação dos perigos levando em conta as atividades, máquinas equipamentos, ferramentas, toxicidade dos produtos químicos que utilizam, agentes e perigos presentes e a eficácia das medidas de proteção existentes. Em seguida realiza-se a avaliação qualitativa dos riscos e a priorização de ações e/ou avaliações necessárias ao seu controle.
          </Text>

        </View>

        <Text style={TextStyles.subTitleSumary}>10. Percepção de Riscos Ocupacionais</Text>

        <View style={styles.textContainer}>
          <Text style={TextStyles.paragraph}>
            A metodologia proposta ocorre durante a visita técnica de campo. O profissional elaborador do PGR promove entrevistas com o grupo de trabalhadores de cada GHE, encarregados e responsáveis aplicando perguntas e questionamentos relacionados a situações, ações ou condições, que tenham potencial direta ou indiretamente, de causar danos a pessoas, patrimônio ou meio ambiente. O trabalhador é estimulado a apontar situações de perigos aplicando os seguintes questionamentos:
          </Text>

          <View style={styles.textContainer}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItemText}>No seu dia a dia de trabalho há fatores que você tem a percepção que prejudicam os processos operacionais?;</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItemText}>No seu dia a dia de trabalho há situações ou condições que contribuem para ocasionar incidentes?;</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItemText}>Há alguma situação no seu trabalho que gera desconforto físico ou mental?;</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItemText}>Dentro do seu setor de trabalho há situações que você indicaria alguma melhoria?;</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItemText}>Há algum canal de comunicação entre você e seu imediato superior para apontar alguma situação de risco?;</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listItemText}>Dentro dos processos que são desenvolvidos diariamente na sua rotina, há alguma situação ou condição de risco ou perigo que não foi mapeada na matriz de risco apresentada?</Text>
            </View>
          </View>

          <Text style={TextStyles.paragraph}>
            Outros questionamentos são realizados conforme dinâmica da visita técnica de campo e novas situações do ponto de vista do reconhecimento dos riscos.
          </Text>

        </View>

        <FooterPage />
      </Page>

    );
  };

  const AssessmentPage = () => {

    const styles = StyleSheet.create({
      textContainer: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
      }
    });

    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>11. Avaliação do Risco - Critérios adotados e tomada de decisão</Text>

        <View style={TextStyles.textContainer}>
          <Text style={TextStyles.paragraph}>
            Para cada risco deve será indicado o nível de risco ocupacional, determinado pela combinação da severidade das possíveis lesões ou agravos à saúde com a probabilidade ou chance de sua ocorrência, aplicando a metodologia de MULHAUSEN & DAMIANO (1998) e pelo apêndice D da BS 8800 (BSI, 1996).
          </Text>

          <Text style={TextStyles.paragraph}>
            Em conformidade com o item 9.4.2 da NR-09, item 17.3.1.2 da NR-17 e demais NR aplicáveis, as avaliações preliminares dos perigos estão contempladas nesta metodologia, nas etapas do processo de identificação de perigos e de avaliação dos riscos descritos no item 1.5.4 NR-01, seguindo os critérios técnicos aplicáveis e registrada no Inventário de Riscos.
          </Text>

          <Text style={TextStyles.paragraph}>
            O levantamento preliminar de perigos é realizado para todas as categorias de fatores de riscos (físico, químicos, biológicos, ergonômicos e mecânicos) levando em consideração as particularidades de cada situação, empregando os critérios técnicos mais adequados para cada perigo, bem como a referência técnica e legal das normas regulamentadoras aplicáveis. O levantamento preliminar de perigos foi contemplado na etapa de identificação de perigos, conforme disposto a seguir.
          </Text>

          <Text style={TextStyles.paragraph}>
            A identificação dos perigos foi realizada por meio da caracterização dos processos desenvolvidos pelos trabalhadores com informações sobre sua ocupação na organização, atividades que realizam, setores onde estão lotados, com o objetivo de estudar como eles se relacionam com os agentes (perigos) presentes nestes processos e no ambiente.
          </Text>

          <Text style={TextStyles.paragraph}>
            Os processos realizados na organização foram mapeados por unidade operacional, setor e atividade, com o objetivo de identificar os grupos de trabalhadores expostos a fatores de risco similares. Os perigos foram inventariados e avaliados por Grupo de Exposição Similar (GES).
          </Text>

          <Text style={TextStyles.paragraph}>
            Grupo de Exposição Similar (GES), também conhecido por Grupo Homogêneo de Exposição (GHE), corresponde ao grupo de trabalhadores expostos de forma semelhante aos agentes de riscos, de tal forma que a avaliação da exposição de qualquer trabalhador do grupo seja representativa da exposição de todos que pertencerem ao mesmo grupo.
          </Text>

          <Text style={TextStyles.paragraph}>
            Para tanto, os profissionais realizam a observação aberta das atividades realizadas pelo trabalhador, coletando dados por meio de entrevistas, análise da documentação e observações dos ambientes de trabalho, relacionando os aspectos do processo produtivo aos perigos potencialmente presentes.
          </Text>

          <Text style={TextStyles.paragraph}>
            Como esse processo deve ser realizado de forma contínua, o responsável da organização deverá assegurar que toda modificação e/ou novo projeto a ser implantado seja avaliado preliminarmente com relação a identificação dos perigos e avaliação dos riscos potencialmente presentes.
          </Text>

          <Text style={TextStyles.paragraph}>
            Após a identificação dos perigos realiza-se a avaliação qualitativa, semi-quantitativa ou quantitativa dos riscos, conforme necessidade, para definição do nível de riscos e priorização de ações, podendo serem previstas novas avaliações quantitativas necessárias à avaliação ou seu controle.
          </Text>

          <Text style={TextStyles.paragraph}>
            A avaliação de riscos ocupacionais se define como um processo global de estimar o nível de risco ocupacional e decidir se ele é aceitável ou necessita de controles adicionais, priorizando as ações de acordo com a classificação de riscos. Entende-se por:
          </Text>

          <Text style={TextStyles.paragraph}>
            Perigo ou fator de risco ocupacional: Fonte ou situação com o potencial de causar lesões ou agravos à saúde. Elemento que isoladamente ou em combinação com outros tem o potencial intrínseco de dar origem a lesões ou agravos à saúde.
          </Text>

          <Text style={TextStyles.paragraph}>
            Risco ocupacional: Resultado da combinação da probabilidade de ocorrer lesão ou agravo à saúde causados por um evento perigoso, exposição a agente nocivo ou exigência da atividade de trabalho e da severidade dessa lesão ou agravo à saúde.
          </Text>
        </View>

        <FooterPage />
      </Page>

    );
  };

  const AssessmentTable = () => {

    const style = StyleSheet.create({
      row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1 solida #495057',
      },

      cellTitle: {
        flex: 1,
        width: '30%',
        backgroundColor: '#0077b6',
        color: '#ffffff',
        padding: 5,
        fontSize: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'OpenSansBold',
      },

      cellBody: {
        width: '70%',
        flex: 2,
        padding: 5,
        fontSize: 8,
        textAlign: 'justify',
        fontFamily: 'OpenSansRegular',
      },

      listItem: {
        marginBottom: 5,
        fontSize: 7,
        fontFamily: 'OpenSansLight',
      },

      list: {
        marginLeft: 20,
      },

      text: {
        marginBottom: 5,
      },

      finalyText: {
        fontSize: 10,
        marginTop: 10,
        fontFamily: 'OpenSansRegular',
      },
    });

    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>Avaliação do Risco - Tabela</Text>

        <View style={TextStyles.textContainer}>

          <View style={TableStyles.table}>
            <View style={style.row}>
              <View style={style.cellTitle}>
                <Text>Probabilidade (P)</Text>
              </View>
              <View style={style.cellBody}>
                <Text style={style.text}>A gradação da probabilidade (P) da ocorrência de lesões ou agravos à saúde levou em conta: </Text>
                <Text style={style.text}>Os requisitos estabelecidos nas normas regulamentadoras: </Text>
                <View style={style.list}>
                  <Text style={style.listItem}>{'\u2022'} As medidas de prevenção implementadas;</Text>
                  <Text style={style.listItem}>{'\u2022'} As exigências da atividade de trabalho;</Text>
                  <Text style={style.listItem}>{'\u2022'}  A comparação do perfil de exposição ocupacional com valores de referência estabelecidos na legislação vigente;</Text>
                  <Text style={style.listItem}>{'\u2022'} Para sua gradação foi levado em conta o tipo do fator de risco reconhecido, o qual teve condições específicas a serem consideradas;</Text>
                  <Text style={style.listItem}>{'\u2022'} A probabilidade (P) foi calculada para cada fator de risco reconhecido, de acordo com a metodologia que se empregou, seguindo-se os critérios relacionados nos quadros 3, 4 e 5, com base na exposição e nos controles adotados pela organização;</Text>
                  <Text style={style.listItem}>{'\u2022'} A gradação da probabilidade da ocorrência do dano (efeito crítico) é feita atribuindo-se um índice de probabilidade (P) variando de 1 a 4, cujo significado está relacionado no quadro;</Text>
                  <Text style={style.listItem}>{'\u2022'} As medidas de prevenção implementadas;</Text>
                </View>
              </View>
            </View>
            <View style={style.row}>
              <View style={style.cellTitle}>
                <Text>Exposição</Text>
              </View>
              <View style={style.cellBody}>
                <Text style={style.text}>Para os fatores de riscos ambientais (físicos, químicos e biológicos) a atribuição do índice de exposição foi feita analisando-se as seguintes condições:</Text>
                <View style={style.list}>
                  <Text style={style.listItem}>{'\u2022'} Perfil de exposição qualitativo identificando as variáveis de tempo e frequência de exposição; </Text>
                  <Text style={style.listItem}>{'\u2022'} Perfil de exposição quantitativo (quando há avaliações quantitativas), levando em consideração intensidade/concentração, tempo de exposição e frequência da exposição, comparando-o com valores de referência estabelecidos na NR-09. Caso existirem medidas de proteção coletivas instaladas, a quantificação da exposição deverá considera-las.</Text>
                </View>
              </View>
            </View>
            <View style={style.row}>
              <View style={style.cellTitle}>
                <Text>Controle</Text>
              </View>
              <View style={style.cellBody}>
                <Text style={style.text}>O componente “controle” foi identificado por meio da verificação da existência de medidas de prevenção implementadas, levando em conta, além de sua necessidade e existência, a adequação às exigências previstas em Normas Regulamentadoras, nas determinações dos dispositivos legais e sua eficácia no controle e mitigação do risco ocupacional.</Text>
                <Text style={style.text}>A verificação da eficácia na mitigação da exposição ao risco pode ser feita com base em evidências de associação, por meio de controle médico da saúde, entre as lesões e os agravos à saúde dos trabalhadores com os riscos e as situações de trabalho identificados. A existência de ocorrências de incidentes e/ou acidentes também é levada em consideração na avaliação do controle. </Text>
                <Text style={style.text}>Para os riscos ambientais (físicos, químicos ou biológicos) a atribuição do índice de controle foi feita analisando-se as seguintes condições: </Text>
                <View style={style.list}>
                  <Text style={style.listItem}>{'\u2022'} Perfil de exposição qualitativo identificando as variáveis: medidas de prevenção (medidas administrativas), reclamações por parte dos trabalhadores e histórico de incidentes/acidentes; </Text>
                  <Text style={style.listItem}>{'\u2022'} Perfil de exposição quantitativo (quando há avaliações quantitativas), comparando-se o nível de exposição com valores de referência estabelecidos na legislação vigente, considerando-se a adoção de medidas de prevenção eficazes. Neste caso foi considerado, para efeito de análise do controle, somente as medidas de prevenção individuais, uma vez que as medidas de prevenção coletivas já foram consideradas anteriormente;</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={style.finalyText}>O índice resultante de controle para os fatores de riscos ambientais, para o cálculo da probabilidade (P), foi o de maior valor encontrado entre os perfis de exposição qualitativo e quantitativo.</Text>
          <Text style={style.finalyText}>O índice de controle dos fatores de riscos ergonômicos ou mecânicos (acidentes), para o cálculo da probabilidade (P), foi resultado de uma análise preliminar com base nas seguintes variáveis: queixas por parte dos trabalhadores, histórico de incidentes/acidentes e medidas de prevenção existentes..</Text>
        </View>

        <FooterPage />
      </Page>

    );
  };

  const AssessmentFrame = () => {

    const style = StyleSheet.create({
      rowTitleTable: {
        width: '100%',
        display: 'row',
        backgroundColor: '#006d77',
      },

      cellTitle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #fff',
      },

      rowSubTitleTable: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#006d77',
      },

      rowSubTitle: {
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowSubTitlefifty: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowSubTitletwentyFive: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowBody: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      cellSubTitlefifty: {
        width: '50%',
      },

      cellSubTitletwentyFive: {
        width: '25%',
        border: '0.3 solid #fff',
      },

      cellIndice: {
        width: '15%',
        height: '100%',
        border: '0.3 solid #fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      cellBodyTitle: {
        width: '100%',
        height: '100%',
        backgroundColor: '#006d77',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #fff',
      },

      cellBody: {
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #6c757d',
      },

      cellBodyTwo: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #6c757d',
      },

      textTitle: {
        fontSize: 9,
        color: '#fff',
        textAlign: 'center',
        padding: 5,
        fontFamily: 'OpenSansBold',
      },

      textSubTitle: {
        fontSize: 8,
        color: '#fff',
        textAlign: 'center',
        padding: 3,
        fontFamily: 'OpenSansBold',
      },

      textBody: {
        fontSize: 7,
        padding: 5,
        textAlign: 'justify',
        fontFamily: 'OpenSansRegular',
      },

      textBodyTitle: {
        fontSize: 8,
        color: '#fff',
        textAlign: 'center',
        padding: 5,
        fontFamily: 'OpenSansBold',
      },

      cellBodyContainer: {
        flexDirection: 'row',
        width: '15%',
        height: '100%',
      },

      cellBodyContainerText: {
        flexDirection: 'row',
        width: '85%',
        height: '100%',
      },

      container: {
        paddingHorizontal: 10,
      },

      space: {
        margin: 5,
      },
    });

    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>Avaliação do Risco - Quadros</Text>
        <Text style={TextStyles.subSubTitleSumary}>Quadro 1 - Probabilidade para os fatores de riscos ambientais (físico, químicos e biológicos)</Text>

        <View style={style.container}>
          <View style={TableStyles.table}>
            <View style={style.rowTitleTable}>
              <View style={style.cellTitle}>
                <Text style={style.textTitle}>Probabilidade ( P = (( E + C X 2 ) / 3 ) + 1 )</Text>
              </View>
            </View>
            <View style={style.rowSubTitleTable}>
              <View style={style.cellIndice}>
                <Text style={style.textTitle}>Índice</Text>
              </View>
              <View style={style.rowSubTitle}>
                <View style={style.rowSubTitlefifty}>
                  <View style={style.cellSubTitlefifty}>
                    <Text style={style.textSubTitle}>Exposição (E)</Text>
                  </View>
                  <View style={style.cellSubTitlefifty}>
                    <Text style={style.textSubTitle}>Controle (C)</Text>
                  </View>
                </View>
                <View style={style.rowSubTitletwentyFive}>
                  <View style={style.cellSubTitletwentyFive}>
                    <Text style={style.textSubTitle}>Perfil Qualitativo</Text>
                  </View>
                  <View style={style.cellSubTitletwentyFive}>
                    <Text style={style.textSubTitle}>Perfil Quantitativo</Text>
                  </View>
                  <View style={style.cellSubTitletwentyFive}>
                    <Text style={style.textSubTitle}>Perfil Qualitativo</Text>
                  </View>
                  <View style={style.cellSubTitletwentyFive}>
                    <Text style={style.textSubTitle}>Perfil Quantitativo</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>1 - Baixo</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Nível baixo de exposição ocupacional ao agente de risco ou tipo de exposição eventual ou em tempo muito curto.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Exposição menor que 50% do limite de tolerância. E "&lt;" 50% do limite de tolerância (abaixo do nível de ação)</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Medidas de prevenção não necessárias ou adequadas e com garantia de continuidade desta situação e não há histórico de incidentes/acidentes relacionados ao perigo avaliado.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>As medidas de prevenção individuais adotadas garantem que o nível de exposição esteja abaixo do nível de ação (E "&lt;" 50% do limite de tolerância).</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>2 - Médio</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Nível moderado de exposição e/ou tipo de exposição intermitente e/ou tempo de exposição médio.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Exposição entre 50% e 100% do limite de tolerância. 50% "&lt;" E "&lt;" 100% do limite de tolerância (no nível de ação)</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Medidas de prevenção adequadas, mas não há garantia de sua manutenção a longo prazo e/ou existem reclamações em termos de verbalizações e/ou histórico de incidentes relacionados ao perigo avaliado</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>As medidas de prevenção individuais adotadas garantem que o nível de exposição esteja no nível de ação (50% "&lt;" E "&lt;" 100% do limite de tolerância).</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>3 - Alto</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Nível significativo de exposição e/ou tipo de exposição permanente e/ou tempo de exposição alto.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Exposição entre o limite de tolerância e seu dobro. 100% "&lt;" E "&lt;" 200% do limite de tolerância (acima do limite de tolerância).</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Medidas de prevenção com desvios ou problemas significativos e não há garantia de sua manutenção e/ou há histórico de acidentes com afastamentos temporários relacionados ao perigo avaliado.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Mesmo com a adoção de medidas de prevenção individuais o nível de exposição encontra-se acima do limite de tolerância. (100% "&lt;" E "&lt;" 200% do limite de tolerância).</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>4 - Excessivo</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Nível excessivo de exposição e/ou tipo de exposição permanente e/ou tempo de exposição muito alto.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Exposição acima do dobro do limite de tolerância. E "&lt;" 200% do limite de tolerância (bem acima do limite de tolerância).</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Medidas de prevenção inexistentes ou reconhecidamente inadequadas e/ou há histórico de acidentes com afastamentos permanentes relacionados ao perigo avaliado.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Mesmo com a adoção de medidas de prevenção individuais o nível de exposição encontra-se bem acima do limite de tolerância (E "&lt;" 200% do limite de tolerância).</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={style.space}></View>

        <Text style={TextStyles.subSubTitleSumary}>Quadro 2 - Probabilidade para os fatores de riscos ergonômicos ou mecânicos (acidentes)</Text>

        <View style={style.container}>
          <View style={TableStyles.table}>
            <View style={style.rowTitleTable}>
              <View style={style.cellTitle}>
                <Text style={style.textTitle}>Probabilidade ( P = (( E + C X 2 ) / 3 ) + 1 )</Text>
              </View>
            </View>
            <View style={style.rowSubTitleTable}>
              <View style={style.cellIndice}>
                <Text style={style.textTitle}>Índice</Text>
              </View>
              <View style={style.rowSubTitle}>
                <View style={style.rowSubTitlefifty}>
                  <View style={style.cellSubTitlefifty}>
                    <Text style={style.textSubTitle}>Exposição (E)</Text>
                  </View>
                  <View style={style.cellSubTitlefifty}>
                    <Text style={style.textSubTitle}>Controle (C)</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>1 - Baixo</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBodyTwo}>
                  <Text style={style.textBody}>Pouco tempo, menos de 10% do tempo amostral (jornada ou ciclo).</Text>
                </View>
                <View style={style.cellBodyTwo}>
                  <Text style={style.textBody}>Medidas de prevenção não necessárias ou adequadas e com garantia de continuidade desta situação e não há histórico de incidentes/acidentes relacionados ao perigo avaliado.</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>2 - Médio</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBodyTwo}>
                  <Text style={style.textBody}>Entre 10% e 40% do tempo amostral (jornada ou ciclo).</Text>
                </View>
                <View style={style.cellBodyTwo}>
                  <Text style={style.textBody}>Medidas de prevenção adequadas, mas não há garantia de sua manutenção a longo prazo e/ou existem queixas em termos de verbalizações e/ou histórico de incidentes relacionados ao perigo avaliado.</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>3 - Alto</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBodyTwo}>
                  <Text style={style.textBody}>Entre 40% e 70% do tempo amostral (jornada ou ciclo).</Text>
                </View>
                <View style={style.cellBodyTwo}>
                  <Text style={style.textBody}>Medidas de prevenção com desvios ou problemas significativos e não há garantia de sua manutenção e/ou há histórico de acidentes com afastamentos temporários relacionados ao perigo avaliado.</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>4 - Excessivo</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBodyTwo}>
                  <Text style={style.textBody}>Acima de 70% do tempo amostral (jornada ou ciclo).</Text>
                </View>
                <View style={style.cellBodyTwo}>
                  <Text style={style.textBody}>Medidas de prevenção inexistentes ou reconhecidamente inadequadas e/ou há histórico de acidentes com afastamentos permanentes relacionados ao perigo avaliado.</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <FooterPage />

      </Page>

    );
  };

  const AssessmentText = () => {

    const styles = StyleSheet.create({
      textContainer: {
        marginTop: 10,
        marginBottom: 20,
      },

      textTitle: {
        fontSize: 11,
        marginBottom: 10,
        marginTop: 10,
        fontFamily: 'OpenSansBold',
      },

      paragraph: {
        fontSize: 9,
        textAlign: 'justify',
        marginBottom: 10,
        marginLeft: 5,
        fontFamily: 'OpenSansRegular',
      },

      listItem: {
        marginBottom: 5,
        fontSize: 8,
        fontFamily: 'OpenSansLight',
      },

      list: {
        marginLeft: 10,
      },
    });

    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />

        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>Cálculo da Probabilidade (P)</Text>
          <Text style={styles.paragraph}>
            A combinação entre o índice (1 a 4) de cada componente avaliado (exposição e controle) resulta na gradação “P” (“Improvável”, “Pouco Provável”, “Provável” ou “Altamente Provável”) da probabilidade, a qual corresponde a uma linha na matriz de classificação dos perigos, conforme ilustrado no quadro 6.
          </Text>

          <Text style={styles.textTitle}>Severidade (S)</Text>
          <Text style={styles.paragraph}>
            A gradação da severidade (S) das possíveis lesões ou agravos à saúde considerou os critérios especiais relacionados com o potencial do perigo em causar lesões ou agravos à saúde, como por exemplo:
          </Text>

          <View style={styles.list}>
            <Text style={styles.listItem}>{'\u2022'} Toxicidade, o potencial carcinogênico, mutagênico e teratogênico de agentes químicos e físicos tendo por base a classificação da ACGIH e da LINACH;</Text>
            <Text style={styles.listItem}>{'\u2022'} Potencial de agentes químicos causarem lesões quando em contato com os olhos, mucosa e pele;</Text>
            <Text style={styles.listItem}>{'\u2022'}  Classificação para agentes biológicos de acordo com dados da secretaria de saúde, dados da CCIH - Comissão de Controle de Infecção Hospitalar, consulta com profissionais médicos, ou outros documentos técnicos disponíveis.</Text>
          </View>

          <Text style={styles.paragraph}>
            Da mesma forma que na probabilidade, para sua gradação também foi levado em conta o tipo do fator de risco que estava sendo avaliado, o qual tem condições específicas a serem consideradas. Em virtude desta especificidade de análise e reconhecimento dos fatores de risco, eles foram classificados em dois tipos: os ambientais, que compreendem os fatores de riscos físicos, químicos e biológicos, e os ergonômicos e mecânicos (acidentes). A severidade (S) foi calculada para cada fator de risco reconhecido, levando-se em consideração a gravidade de uma possível lesão e o percentual de pessoas expostas, de acordo com os quadros 3, 4 e 5. Considera-se neste documento o termo “Nº. De Pessoas Expostas” como sendo o número de trabalhadores possivelmente afetados pelo perigo avaliado.
          </Text>

          <Text style={styles.textTitle}>Gravidade</Text>
          <Text style={styles.paragraph}>
            Com relação aos fatores de riscos ambientais (físicos, químicos e biológicos), o índice para a “gravidade” é atribuído após análise de uma das seguintes condições:
          </Text>

          <View style={styles.list}>
            <Text style={styles.listItem}>{'\u2022'} Critério qualitativo do dano para perigos físicos e biológicos e/ou se carcinogênicos LINACH ou ACGIH;</Text>
            <Text style={styles.listItem}>{'\u2022'} Toxicidade do contaminante químico baseada nos limites de tolerância (LT) aplicáveis, para “Gás ou Vapor” ou “Particulados”.</Text>
          </View>

          <Text style={styles.paragraph}>
            Para aqueles fatores de risco ambientais considerados carcinogênicos, este índice é atribuído diretamente pelo “Critério qualitativo do dano e/ou se carcinogênicos LINACH ou ACGIH”, independentemente de o tipo ser “Gás ou Vapor” ou “Particulados”. A atribuição do índice para a “gravidade” dos fatores de risco ergonômicos e mecânicos (acidentes) ocorre a partir da análise das seguintes condições:
          </Text>

          <View style={styles.list}>
            <Text style={styles.listItem}>{'\u2022'} Humanas (baseada na gravidade de uma possível lesão e seus efeitos);</Text>
            <Text style={styles.listItem}>{'\u2022'} Organização (baseada no grau de interferência no processo produtivo);</Text>
          </View>

          <Text style={styles.paragraph}>
            Sempre será atribuído para este índice o valor encontrado entre a condição “humanas” e “organização”, referente ao fator de risco analisado.
          </Text>

          <Text style={styles.textTitle}>Pessoas Expostas</Text>
          <Text style={styles.paragraph}>
            O índice relativo às “Pessoas Expostas” é definido pela porcentagem da razão entre o total de trabalhadores do grupo de exposição ao perigo avaliado e o total de trabalhadores do estabelecimento.
          </Text>

          <Text style={styles.textTitle}>Magnitude</Text>
          <Text style={styles.paragraph}>
            Relação entre a gravidade da consequência das lesões ou agravos à saúde e o número de pessoas expostas.
          </Text>

        </View>

        <FooterPage />
      </Page>

    );
  };

  const AssessmentFrameSeverity = () => {

    const style = StyleSheet.create({
      rowTitleTable: {
        width: '100%',
        display: 'row',
        backgroundColor: '#006d77',
      },

      cellTitle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #fff',
      },

      rowSubTitleTable: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#006d77',
      },

      rowSubTitle: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowSubTitleFrame: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowSubTitlefifty: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowSubTitletwentyFive: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowBody: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowTitleSubTable: {
        width: '100%',
      },

      cellSubTitle: {
        width: '100%',
        border: '0.3 solid #fff',
      },

      cellSubTitletwentyFive: {
        width: '100%',
        height: '100%',
        border: '0.3 solid #fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      cellSubTitletwenty: {
        width: '100%',
        height: '100%',
        border: '0.3 solid #fff',
      },

      cellIndice: {
        width: '10%',
        height: '100%',
        border: '0.3 solid #fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      cellPessoasExpostas: {
        width: '20%',
        height: '100%',
        border: '0.3 solid #fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      cellBodyTitle: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #fff',
        backgroundColor: '#006d77',
      },

      cellBodyTitlePE: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #6c757d',
      },

      cellBody: {
        width: '33.33%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #6c757d',
      },

      textTitle: {
        fontSize: 9,
        color: '#fff',
        textAlign: 'center',
        padding: 5,
        fontFamily: 'OpenSansBold',
      },

      textSubTitle: {
        fontSize: 8,
        color: '#fff',
        textAlign: 'center',
        padding: 3,
        fontFamily: 'OpenSansBold',
      },

      textBody: {
        fontSize: 7,
        padding: 5,
        textAlign: 'justify',
        fontFamily: 'OpenSansRegular',
      },

      textBodyTitle: {
        fontSize: 8,
        color: '#fff',
        textAlign: 'center',
        padding: 5,
        fontFamily: 'OpenSansBold',
      },

      cellBodyContainer: {
        flexDirection: 'row',
        width: '10%',
        height: '100%',
      },

      cellBodyContainerPessoasExpostas: {
        flexDirection: 'row',
        width: '20%',
        height: '100%',
      },

      cellBodyContainerText: {
        flexDirection: 'row',
        width: '70%',
        height: '100%',
      },

      cellBodyContainerTextQ4: {
        flexDirection: 'row',
        width: '90%',
        height: '100%',
      },

      container: {
        paddingHorizontal: 10,
      },

      space: {
        margin: 5,
      },

      subRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },

      subRowCell: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />

        <Text style={TextStyles.subSubTitleSumary}>Quadro 3 - Severidade para os fatores de risco ambientais (químicos).</Text>

        <View style={style.container}>
          <View style={TableStyles.table}>
            {/* Titulo */}
            <View style={style.rowTitleTable}>
              <View style={style.cellTitle}>
                <Text style={style.textTitle}>Severidade (S = (( G x 2 + PE ) / 3 ) + 1 )</Text>
              </View>
            </View>

            <View style={style.rowSubTitleTable}>
              {/* Índice */}
              <View style={style.cellIndice}>
                <Text style={style.textTitle}>Índice</Text>
              </View>

              {/* Subtitulos */}
              <View style={style.rowSubTitle}>
                <View style={style.rowSubTitlefifty}>
                  <View style={style.cellSubTitle}>
                    <Text style={style.textSubTitle}>Gravidade (G)</Text>
                  </View>
                </View>
                <View style={style.rowTitleSubTable}>
                  <View style={style.rowSubTitletwentyFive}>
                    {/* Critério... */}
                    <View style={style.cellSubTitletwentyFive}>
                      <Text style={style.textSubTitle}>Critério qualitativo ao dado ou carcinogênicos confirmados LINACH Grupo 1 / ACGIH A1</Text>
                    </View>
                    {/* Toxicidade */}
                    <View style={style.cellSubTitletwenty}>
                      <View style={style.subRow}>
                        <View style={style.cellSubTitletwentyFive}>
                          <Text style={style.textSubTitle}>Toxicidade do contaminante químico baseada nos limites de tolerância aplicáveis</Text>
                        </View>
                      </View>

                      {/* Gás / Particulados */}
                      <View style={style.subRow}>
                        <View style={style.subRowCell}>
                          <Text style={style.textSubTitle}>Gás ou Vapor</Text>
                        </View>
                        <View style={style.subRowCell}>
                          <Text style={style.textSubTitle}>Particulados</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

              </View>

              {/* Pessoas Expostas */}
              <View style={style.cellPessoasExpostas}>
                <Text style={style.textTitle}>Pessoas Expostas</Text>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>1 - Baixo</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Agente classificado como irritante leve para a pele, olhos e mucosas. Lesão ou doença leve, com efeitos reversíveis.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Até 10% do total de trabalhadores do estabelecimento.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Limite de tolerância "&lt;"= 10 mg/m³</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerPessoasExpostas}>
                <View style={style.cellBodyTitlePE}>
                  <Text style={style.textBody}>Até 10% do total de trabalhadores do estabelecimento.</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>2 - Médio</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Agente classificado como irritante para a pele, olhos, mucosas e sistema respiratório superior. Lesão ou doença moderada, com efeitos reversíveis.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>100 "&lt;" limite de tolerância "&lt;"= 500 ppm</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>1 "&lt;" limite de tolerância "&lt;" 10 mg/m³ </Text>
                </View>
              </View>
              <View style={style.cellBodyContainerPessoasExpostas}>
                <View style={style.cellBodyTitlePE}>
                  <Text style={style.textBody}>Entre 10% e 30% do total de trabalhadores do estabelecimento</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>3 - Alto</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Agente altamente irritante ou corrosivo para mucosas, pele, sistema respiratório e digestivo, resultando em lesões irreversíveis limitantes da capacidade funcional. Lesão ou doença, com efeitos irreversíveis.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>10 "&lt;" limite de tolerância "&lt;"= 100 ppm</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>0,1 "&lt;" limite de tolerância "&lt;"= 1 mg/m³ </Text>
                </View>
              </View>
              <View style={style.cellBodyContainerPessoasExpostas}>
                <View style={style.cellBodyTitlePE}>
                  <Text style={style.textBody}>Entre 30% e 60% do total de trabalhadores do estabelecimento.</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>3 - Excessivo</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Cancerígenos LINACH Grupo 1 /ACGIH A1, ou agente com efeito cáustico sobre a pele, olhos (ameaça de causar perda da visão) e mucosas, podendo resultar em morte ou lesões incapacitantes.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Limite de tolerância "&lt;"= 10 ppm</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Limite de tolerância "&lt;"= 1 mg/m³ </Text>
                </View>
              </View>
              <View style={style.cellBodyContainerPessoasExpostas}>
                <View style={style.cellBodyTitlePE}>
                  <Text style={style.textBody}>Acima de 60% do total de trabalhadores do estabelecimento.</Text>
                </View>
              </View>
            </View>

          </View>
        </View>


        <Text style={TextStyles.subSubTitleSumary}>Quadro 4 - Severidade para os fatores de risco ambientais (Físico: Ruído, Calor, Vibração).</Text>

        <View style={style.container}>
          <View style={TableStyles.table}>
            <View style={style.rowTitleTable}>
              <View style={style.cellTitle}>
                <Text style={style.textTitle}>Severidade (S = inteiro (( G x 2 + PE ) / 3 ) + 1 )</Text>
              </View>
            </View>
            <View style={style.rowSubTitleTable}>
              <View style={style.cellIndice}>
                <Text style={style.textTitle}>Índice</Text>
              </View>
              <View style={style.rowSubTitleFrame}>
                <View style={style.rowSubTitlefifty}>
                  <View style={style.subRow}>
                    <Text style={style.textSubTitle}>Gravidade (G)</Text>
                  </View>
                </View>
                <View style={style.rowSubTitletwentyFive}>
                  <View style={style.cellSubTitletwentyFive}>
                    <Text style={style.textSubTitle}>Perfil Qualitativo</Text>
                  </View>
                  <View style={style.cellSubTitletwentyFive}>
                    <Text style={style.textSubTitle}>Perfil Quantitativo</Text>
                  </View>
                  <View style={style.cellSubTitletwentyFive}>
                    <Text style={style.textSubTitle}>Pessoas Expostas (PE)</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>1 - Baixo</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerTextQ4}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Nível baixo de exposição ocupacional ao agente de risco ou tipo de exposição eventual ou em tempo muito curto.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Exposição menor que 50% do limite de tolerância. E "&lt;" 50% do limite de tolerância (abaixo do nível de ação)</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Até 10% do total de trabalhadores do estabelecimento.</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>2 - Médio</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerTextQ4}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Nível moderado de exposição e/ou tipo de exposição intermitente e/ou tempo de exposição médio.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Exposição entre 50% e 100% do limite de tolerância. 50% "&lt;"= E "&lt;"= 100% do limite de tolerância (no nível de ação)</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Entre 10% e 30% do total de trabalhadores do estabelecimento.</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>3 - Alto</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerTextQ4}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Nível significativo de exposição e/ou tipo de exposição permanente e/ou tempo de exposição alto.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Exposição entre o limite de tolerância e seu dobro. 100% "&lt;" E "&lt;" 200% do limite de tolerância (acima do limite de tolerância).</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Entre 30% e 60% do total de trabalhadores do estabelecimento.</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>4 - Excessivo</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerTextQ4}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Nível excessivo de exposição e/ou tipo de exposição permanente e/ou tempo de exposição muito alto.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Exposição acima do dobro do limite de tolerância. E "&lt;" 200% do limite de tolerância (bem acima do limite de tolerância).</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Acima de 60% do total de trabalhadores do estabelecimento.</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <FooterPage />

      </Page>

    );
  };

  const AssessmentFrameText = () => {

    const style = StyleSheet.create({
      container: {
        paddingHorizontal: 10,
      },

      rowTitleTable: {
        width: '100%',
        display: 'row',
        backgroundColor: '#006d77',
      },

      cellTitle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #fff',
      },

      textTitle: {
        fontSize: 9,
        color: '#fff',
        textAlign: 'center',
        padding: 5,
      },

      rowSubTitleTable: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#006d77',
      },

      cellIndice: {
        width: '10%',
        height: '100%',
        border: '0.3 solid #fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowSubTitle: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowSubTitlefifty: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      cellSubTitle: {
        width: '100%',
        border: '0.3 solid #fff',
      },

      textSubTitle: {
        fontSize: 8,
        color: '#fff',
        textAlign: 'center',
        padding: 3,
      },

      rowTitleSubTable: {
        width: '100%',
      },

      rowSubTitletwentyFive: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      cellSubTitletwentyFive: {
        width: '100%',
        height: '100%',
        border: '0.3 solid #fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      cellSubTitletwenty: {
        width: '100%',
        height: '100%',
        border: '0.3 solid #fff',
      },

      subRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },

      subRowCell: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },

      cellPessoasExpostas: {
        width: '20%',
        height: '100%',
        border: '0.3 solid #fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      rowBody: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      cellBodyContainer: {
        flexDirection: 'row',
        width: '10%',
        height: '100%',
      },

      cellBodyTitle: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #fff',
        backgroundColor: '#006d77',
      },

      textBodyTitle: {
        fontSize: 8,
        color: '#fff',
        textAlign: 'center',
        padding: 5,
      },

      cellBodyContainerText: {
        flexDirection: 'row',
        width: '70%',
        height: '100%',
      },

      cellBody: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #6c757d',
      },

      textBody: {
        fontSize: 7,
        padding: 5,
        textAlign: 'justify',
        fontFamily: 'OpenSansRegular',
      },

      cellBodyContainerPessoasExpostas: {
        flexDirection: 'row',
        width: '20%',
        height: '100%',
      },

      cellBodyTitlePE: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        border: '0.3 solid #6c757d',
        fontFamily: 'OpenSansBold',
      },

      containerText: {
        margin: 10,
      },

      title: {
        fontSize: 12,
        fontFamily: 'OpenSansBold',
      },

      paragraph: {
        fontSize: 10,
        fontFamily: 'OpenSansRegular',
      },

      probContainer: {
        backgroundColor: '#006d77',
        justifyContent: 'center',
        alignItems: 'center',
        width: '5%',
      },

      probText: {
        color: '#fff',
        fontSize: 9,
        padding: 5,
        fontFamily: 'OpenSansBold',
      },

      contentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
      },

      rowContent: {
        width: '100%',
        flexDirection: 'row',
      },

      contentCell: {
        width: '20%',
        justifyContent: 'center',
        border: '0.3 solida #000',
      },

      contentCellY: {
        width: '20%',
        justifyContent: 'center',
        backgroundColor: '#fcefb4',
      },

      contentCellO: {
        width: '20%',
        justifyContent: 'center',
        backgroundColor: '#fb8b24',
      },

      contentCellR: {
        width: '20%',
        justifyContent: 'center',
        backgroundColor: '#e5383b',
      },

      contentCellG: {
        width: '20%',
        justifyContent: 'center',
        backgroundColor: '#57cc99',
      },

      contentCellB: {
        width: '20%',
        justifyContent: 'center',
        backgroundColor: '#8ecae6',
      },

      sevCell: {
        justifyContent: 'center',
        alignItems: 'center',
      },

      sevText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 11,
        padding: 3,
        fontFamily: 'OpenSansBold',
      },

      sevContainer: {
        width: '100%',
        backgroundColor: '#006d77',
        justifyContent: 'center',
        alignItems: 'center',
      },

      textContent: {
        fontSize: 8,
        padding: 5,
        textAlign: 'center',
        fontFamily: 'OpenSansRegular',
      },

      textContentW: {
        fontSize: 8,
        padding: 5,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'OpenSansRegular',
      },

      contentContainerGlobal: {
      },

      tableContainer: {
        flexDirection: 'row',
      },

      matrizContainer: {
        flexDirection: 'row',
      },

      legend: {
        fontSize: 8,
        textAlign: 'right',
        fontFamily: 'OpenSansLight',
      },

      contentCellGr: {
        backgroundColor: '#e7ecef',
        width: '20%',
        justifyContent: 'center',
        border: '0.5 solid #adb5bd'
      },

      listItem: {
        marginBottom: 5,
        fontSize: 8,
        fontFamily: 'OpenSansLight',
      },

      list: {
        marginLeft: 20,
      },
    });

    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />

        <Text style={TextStyles.subSubTitleSumary}>Quadro 5 - Severidade para os fatores de risco ergonômicos ou mecânicos (acidentes).</Text>

        <View style={style.container}>
          <View style={TableStyles.table}>
            {/* Titulo */}
            <View style={style.rowTitleTable}>
              <View style={style.cellTitle}>
                <Text style={style.textTitle}>Severidade (S = (( G x 2 + PE ) / 3 ) + 1 )</Text>
              </View>
            </View>

            <View style={style.rowSubTitleTable}>
              {/* Índice */}
              <View style={style.cellIndice}>
                <Text style={style.textTitle}>Índice</Text>
              </View>

              {/* Subtitulos */}
              <View style={style.rowSubTitle}>
                <View style={style.rowSubTitlefifty}>
                  <View style={style.cellSubTitle}>
                    <Text style={style.textSubTitle}>Gravidade (G)</Text>
                  </View>
                </View>
                <View style={style.rowTitleSubTable}>
                  <View style={style.rowSubTitletwentyFive}>
                    <View style={style.cellSubTitletwentyFive}>
                      <Text style={style.textSubTitle}>Humanas</Text>
                    </View>
                    <View style={style.cellSubTitletwentyFive}>
                      <Text style={style.textSubTitle}>Organização</Text>
                    </View>
                  </View>
                </View>

              </View>

              {/* Pessoas Expostas */}
              <View style={style.cellPessoasExpostas}>
                <Text style={style.textTitle}>Pessoas Expostas</Text>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>1 - Baixo</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Podem gerar desconforto, sobrecarga ou lesões leves, sem afastamento.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Pouca ou nenhuma interferência no processo.</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerPessoasExpostas}>
                <View style={style.cellBodyTitlePE}>
                  <Text style={style.textBody}>Até 10% do total de trabalhadores do estabelecimento.</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>2 - Médio</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Podem gerar desconforto, lesões moderadas, lesões reversíveis e/ou afastamento de até 15 dias.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Implica em paradas momentâneas e pequenas perdas na produtividade.</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerPessoasExpostas}>
                <View style={style.cellBodyTitlePE}>
                  <Text style={style.textBody}>Entre 10% e 30% do total de trabalhadores do estabelecimento.</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>3 - Alto</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Podem gerar lesões graves, lesões irreversíveis e/ou afastamento temporário maior que 15 dias.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Implica em paradas com moderada perda de produtividade.</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerPessoasExpostas}>
                <View style={style.cellBodyTitlePE}>
                  <Text style={style.textBody}>Entre 30% e 60% do total de trabalhadores do estabelecimento.</Text>
                </View>
              </View>
            </View>

            <View style={style.rowBody}>
              <View style={style.cellBodyContainer}>
                <View style={style.cellBodyTitle}>
                  <Text style={style.textBodyTitle}>4 - Excessivo</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerText}>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Podem gerar lesões graves, lesões irreversíveis e incapacitantes e/ou afastamento permanente.</Text>
                </View>
                <View style={style.cellBody}>
                  <Text style={style.textBody}>Implica em paradas significativas com grande perda de produtividade.</Text>
                </View>
              </View>
              <View style={style.cellBodyContainerPessoasExpostas}>
                <View style={style.cellBodyTitlePE}>
                  <Text style={style.textBody}>Acima de 60% do total de trabalhadores do estabelecimento.</Text>
                </View>
              </View>
            </View>

          </View>
        </View>

        <View style={style.containerText}>
          <Text style={style.title}>Cálculo da Severidade (S)</Text>
          <Text style={style.paragraph}>A combinação entre o índice (1 a 4) de cada componente avaliado (gravidade e pessoas expostas) resulta na gradação “S” (“mínima”, “mediana”, “considerável” ou “crítica”) da severidade, a qual corresponde a uma coluna na matriz de priorização dos perigos, conforme ilustrado no quadro 6.</Text>
        </View>
        <View style={style.containerText}>
          <Text style={style.title}>Determinação do Nivel de Risco (S)</Text>
          <Text style={style.paragraph}>A determinação do nível de risco (parâmetro N), de cada perigo reconhecido, foi realizada a partir da combinação dos valores calculados para a severidade (S) e probabilidade (P) da ocorrência da lesão ou agravo à saúde, utilizando a matriz apresentada no quadro 6.</Text>
        </View>


        <Text style={TextStyles.subSubTitleSumary}>Quadro 6 - Matriz de classificação dos perigos por categorias conforme seus níveis de risco.</Text>

        <View style={style.container}>
          <View style={TableStyles.table}>
            <View style={style.matrizContainer}>
              <View style={style.probContainer}>
                <View style={style.probCell}>
                  <Text style={style.probText}>(P)</Text>
                </View>
                {/* Content */}
              </View>
              <View style={style.contentContainerGlobal}>
                <View style={style.contentContainer}>
                  {/* Content */}
                  <View style={style.rowContent}>
                    <View style={style.contentCellGr}>
                      <Text style={style.textContent}>Altamente Provável</Text>
                    </View>
                    <View style={style.contentCellY}>
                      <Text style={style.textContent}>Moderado (PR3)</Text>
                    </View>
                    <View style={style.contentCellO}>
                      <Text style={style.textContentW}>Alto (PR2)</Text>
                    </View>
                    <View style={style.contentCellO}>
                      <Text style={style.textContentW}>Alto (PR2)</Text>
                    </View>
                    <View style={style.contentCellR}>
                      <Text style={style.textContentW}>Intolerável (PR1)</Text>
                    </View>
                  </View>
                </View>
                <View style={style.contentContainer}>
                  <View style={style.rowContent}>
                    <View style={style.contentCellGr}>
                      <Text style={style.textContent}>Provável</Text>
                    </View>
                    <View style={style.contentCellG}>
                      <Text style={style.textContent}>Tolerável (PR4)</Text>
                    </View>
                    <View style={style.contentCellY}>
                      <Text style={style.textContent}>Moderado (PR3) </Text>
                    </View>
                    <View style={style.contentCellO}>
                      <Text style={style.textContentW}>Alto (PR2)</Text>
                    </View>
                    <View style={style.contentCellO}>
                      <Text style={style.textContentW}>Alto (PR2)</Text>
                    </View>
                  </View>
                </View>
                <View style={style.contentContainer}>
                  <View style={style.rowContent}>
                    <View style={style.contentCellGr}>
                      <Text style={style.textContent}>Pouco Provável</Text>
                    </View>
                    <View style={style.contentCellG}>
                      <Text style={style.textContent}>Tolerável (PR4)</Text>
                    </View>
                    <View style={style.contentCellG}>
                      <Text style={style.textContent}>Tolerável (PR4)</Text>
                    </View>
                    <View style={style.contentCellY}>
                      <Text style={style.textContent}>Moderado (PR3)</Text>
                    </View>
                    <View style={style.contentCellO}>
                      <Text style={style.textContentW}>Alto (PR2)</Text>
                    </View>
                  </View>
                </View>
                <View style={style.contentContainer}>
                  <View style={style.rowContent}>
                    <View style={style.contentCellGr}>
                      <Text style={style.textContent}>Improvável</Text>
                    </View>
                    <View style={style.contentCellB}>
                      <Text style={style.textContent}>Irrelevante (NA)</Text>
                    </View>
                    <View style={style.contentCellG}>
                      <Text style={style.textContent}>Tolerável (PR4)</Text>
                    </View>
                    <View style={style.contentCellG}>
                      <Text style={style.textContent}>Tolerável (PR4) </Text>
                    </View>
                    <View style={style.contentCellY}>
                      <Text style={style.textContent}>Moderado (PR3)</Text>
                    </View>
                  </View>
                </View>
                <View style={style.contentContainer}>
                  <View style={style.rowContent}>
                    <View style={style.contentCell}>
                      <Text style={style.textContent}></Text>
                    </View>
                    <View style={style.contentCellGr}>
                      <Text style={style.textContent}>Mínima</Text>
                    </View>
                    <View style={style.contentCellGr}>
                      <Text style={style.textContent}>Mediana</Text>
                    </View>
                    <View style={style.contentCellGr}>
                      <Text style={style.textContent}>Considerável</Text>
                    </View>
                    <View style={style.contentCellGr}>
                      <Text style={style.textContent}>Crítica</Text>
                    </View>
                  </View>
                </View>
                <View style={style.sevContainer}>
                  <View style={style.sevCell}>
                    <Text style={style.sevText}>(S)</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={style.legend}>Legenda: (P) - Probabilidade | (S) - Severidade</Text>
          </View>

          <View style={style.containerText}>
            <Text style={style.title}>Classificação de Prioridade (PR)</Text>
            <Text style={style.paragraph}>A priorização das ações foi estabelecida pelo nível de risco calculado (N). Foram definidas 4 (quatro) categorias de priorização de ações (PR1, PR2, PR3 e PR4), de acordo com a classificação de prioridade do risco:</Text>
          </View>

          <View style={style.list}>
            <Text style={style.listItem}>{'\u2022'} Toxicidade, o potencial carcinogênico, mutagênico e teratogênico de agentes químicos e físicos tendo por base a classificação da ACGIH e da LINACH;</Text>
            <Text style={style.listItem}>{'\u2022'} Potencial de agentes químicos causarem lesões quando em contato com os olhos, mucosa e pele;</Text>
            <Text style={style.listItem}>{'\u2022'}  Classificação para agentes biológicos de acordo com dados da secretaria de saúde, dados da CCIH - Comissão de Controle de Infecção Hospitalar, consulta com profissionais médicos, ou outros documentos técnicos disponíveis.</Text>
          </View>

          <View style={style.containerText}>
            <Text style={style.paragraph}>Para o perigo avaliado no nível de risco “irrelevante”, a priorização de ações não será aplicável, sendo representado como “NA”. No quadro 7 são apresentadas, para cada classificação, as recomendações de conduta administrativo a serem avaliadas pela organização.</Text>
          </View>

        </View>

        <FooterPage />

      </Page>
    );

  };

  const AssessmentFrameSeven = () => {

    const style = StyleSheet.create({
      container: {
        paddingHorizontal: 10,
      },

      titleContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#006d77',
        justifyContent: 'center',
        alignItems: 'center',
      },

      titleText: {
        padding: 5,
        textAlign: 'center',
        color: '#fff',
        fontSize: 11,
        fontFamily: 'OpenSansBold',
      },

      subTitleContainer: {
        flexDirection: 'row',
        backgroundColor: '#006d77',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        border: '1 solid #42999b',
      },

      subTitleCell: {
        width: '20%',
        border: '0.5 solid #42999b',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      subTitleCellLast: {
        width: '40%',
        border: '0.5 solid #42999b',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      subTitleText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 10,
        padding: 5,
        fontFamily: 'OpenSansBold',
      },

      contentRow: {
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'row',
      },

      contentCell: {
        width: '20%',
        border: '0.5 solid #6c757d',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      contentCellLast: {
        width: '40%',
        border: '0.5 solid #6c757d',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      contentCellBlue: {
        width: '20%',
        border: '0.5 solid #6c757d',
        height: '100%',
        backgroundColor: '#8ECAE6',
      },

      contentCellGreen: {
        width: '20%',
        border: '0.5 solid #6c757d',
        height: '100%',
        backgroundColor: '#57CC99',
      },

      contentCellYellow: {
        width: '20%',
        border: '0.5 solid #6c757d',
        height: '100%',
        backgroundColor: '#FCEFB4',
      },

      contentCellOrange: {
        width: '20%',
        border: '0.5 solid #6c757d',
        height: '100%',
        backgroundColor: '#FB8B24',
      },

      contentCellRed: {
        width: '20%',
        border: '0.5 solid #6c757d',
        height: '100%',
        backgroundColor: '#E5383B',
      },

      contentText: {
        textAlign: 'justify',
        fontSize: 7,
        padding: 5,
        fontFamily: 'OpenSansRegular',
      },

      listItem: {
        marginBottom: 5,
        fontSize: 8,
        fontFamily: 'OpenSansLight',
      },

      list: {
        marginLeft: 20,
      },

      containerText: {
        margin: 10,
      },

      title: {
        fontSize: 12,
        fontFamily: 'OpenSansBold',
      },

      paragraph: {
        fontSize: 10,
        fontFamily: 'OpenSansRegular',
      },
    });

    return (
      <Page style={PageStyles.Page}>

        <HeaderPage />

        <Text style={TextStyles.subSubTitleSumary}>Quadro 7 - Determinação dos níveis de risco (parâmetro N) e classificação de prioridades.</Text>
        <View style={style.container}>
          <View style={TableStyles.table}>
            {/* Title */}
            <View style={style.titleContainer}>
              <Text style={style.titleText}>Determinação e Classificação dos Níveis de Risco</Text>
            </View>
            {/* SubTitle */}
            <View style={style.subTitleContainer}>
              <View style={style.subTitleCell}>
                <Text style={style.subTitleText}>Parâmetro N</Text>
              </View>
              <View style={style.subTitleCell}>
                <Text style={style.subTitleText}>Níveis de Risco</Text>
              </View>
              <View style={style.subTitleCell}>
                <Text style={style.subTitleText}>Classificação</Text>
              </View>
              <View style={style.subTitleCellLast}>
                <Text style={style.subTitleText}>Conduta Adminitrativa</Text>
              </View>
            </View>
            {/* Line 1 */}
            <View style={style.contentRow}>
              <View style={style.contentCellBlue}>
              </View>
              <View style={style.contentCell}>
                <Text style={style.contentText}>Irrelevante</Text>
              </View>
              <View style={style.contentCell}>
                <Text style={style.contentText}>N/A</Text>
              </View>
              <View style={style.contentCellLast}>
                <Text style={style.contentText}>Não há necessidade de estabelecer nova ação de controle. Os controles existentes deverão ser mantidos.</Text>
              </View>
            </View>
            {/* Line 2 */}
            <View style={style.contentRow}>
              <View style={style.contentCellGreen}>
              </View>
              <View style={style.contentCell}>
                <Text style={style.contentText}>Tolerável</Text>
              </View>
              <View style={style.contentCell}>
                <Text style={style.contentText}>PR4</Text>
              </View>
              <View style={style.contentCellLast}>
                <Text style={style.contentText}>Poderá ser mantido o controle existente e avaliar a necessidade de medidas corretivas ou adicionais. A necessidade de estabelecer monitoramento deve ser avaliada, quando necessário.</Text>
              </View>
            </View>
            {/* Line 3 */}
            <View style={style.contentRow}>
              <View style={style.contentCellYellow}>
              </View>
              <View style={style.contentCell}>
                <Text style={style.contentText}>Moderado</Text>
              </View>
              <View style={style.contentCell}>
                <Text style={style.contentText}>PR3</Text>
              </View>
              <View style={style.contentCellLast}>
                <Text style={style.contentText}>Um planejamento a médio e longo prazo deve ser elaborado. As rotinas e controles existentes devem ser monitorado e a necessidade de implantação de novos controles e ações deve ser avaliada.</Text>
              </View>
            </View>
            {/* Line 4 */}
            <View style={style.contentRow}>
              <View style={style.contentCellOrange}>
              </View>
              <View style={style.contentCell}>
                <Text style={style.contentText}>Alto</Text>
              </View>
              <View style={style.contentCell}>
                <Text style={style.contentText}>PR2</Text>
              </View>
              <View style={style.contentCellLast}>
                <Text style={style.contentText}>Um planejamento a curto prazo deve ser elaborado. As rotinas e controles quando existentes devem ser reavaliadas e novos controles e ações devem ser implantados sempre que necessário.</Text>
              </View>
            </View>
            {/* Line 5 */}
            <View style={style.contentRow}>
              <View style={style.contentCellRed}>
              </View>
              <View style={style.contentCell}>
                <Text style={style.contentText}>Intolerável</Text>
              </View>
              <View style={style.contentCell}>
                <Text style={style.contentText}>PR1</Text>
              </View>
              <View style={style.contentCellLast}>
                <Text style={style.contentText}>Ações corretivas devem ser adotadas imediatamente. O nível de risco deverá ser reavaliado após as medidas terem sidos adotadas ou implantadas.</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={style.containerText}>
          <Text style={style.title}>Observações</Text>
        </View>

        <View style={style.list}>
          <Text style={style.listItem}>{'\u2022'}A organização manterá as rotinas de avaliações ambientais, quando aplicável, e monitoramento das medidas de controle existentes, para todos os perigos reconhecidos, independente da classificação do risco;</Text>
          <Text style={style.listItem}>{'\u2022'}Para os perigos, cujos riscos foram classificados como PR1, PR2 ou PR3, a organização implantará controles operacionais de acordo com o plano de ação previamente definido;</Text>
          <Text style={style.listItem}>{'\u2022'}Para os riscos classificados como PR1, a organização aumentará o rigor no monitoramento de seus controles;</Text>
          <Text style={style.listItem}>{'\u2022'}Para os perigos, cujos os riscos foram classificados como PR3 que apresentem severidade “crítica” e probabilidade “improvável”, a organização também aumentará o rigor no monitoramento de seus controles.</Text>
        </View>

        <FooterPage />

      </Page>
    );
  };

  const FrequencyPage = () => {

    const style = StyleSheet.create({
      listItem: {
        marginBottom: 5,
        fontSize: 8,
        fontFamily: 'OpenSansLight',
      },

      list: {
        marginLeft: 20,
      },

      containerText: {
        margin: 10,
      },

      title: {
        fontSize: 12,
        fontFamily: 'OpenSansRegular',
      },

      paragraph: {
        fontSize: 10,
        fontFamily: 'OpenSansRegular',
      },

      space: {
        padding: 20,
      },
    });

    return (
      <Page style={PageStyles.Page}>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>12. Periodicidade e Forma de Avaliação do Desenvolvimento do PGR</Text>

        <View style={style.containerText}>
          <Text style={style.title}>A avaliação de riscos deve constituir um processo contínuo e ser revista a cada dois anos ou quando da ocorrência das seguintes situações:</Text>
        </View>

        <View style={style.list}>
          <Text style={style.listItem}>{'\u2022'}Após implementação das medidas de prevenção, para avaliação de riscos residuais;</Text>
          <Text style={style.listItem}>{'\u2022'}Após inovações e modificações nas tecnologias, ambientes, processos;</Text>
          <Text style={style.listItem}>{'\u2022'}Condições, procedimentos e organização do trabalho que impliquem em novos riscos ou
            modifiquem os riscos existentes;</Text>
          <Text style={style.listItem}>{'\u2022'}Quando identificadas inadequações, insuficiências ou ineficácias das medidas de prevenção;</Text>
          <Text style={style.listItem}>{'\u2022'}Na ocorrência de acidentes ou doenças relacionadas ao trabalho;</Text>
          <Text style={style.listItem}>{'\u2022'}Quando houver mudança nos requisitos legais aplicáveis.</Text>
        </View>

        <View style={style.space}></View>

        <Text style={TextStyles.subTitleSumary}>13. Plano de Ação</Text>

        <View style={style.containerText}>
          <Text style={style.title}>O plano de ação consta no corpo deste documento (após o inventário de riscos), contendo:</Text>
        </View>

        <View style={style.list}>
          <Text style={style.listItem}>{'\u2022'}Setor;</Text>
          <Text style={style.listItem}>{'\u2022'}Descrição dos perigos/fatores de riscos;</Text>
          <Text style={style.listItem}>{'\u2022'}Tipo de Perigo;</Text>
          <Text style={style.listItem}>{'\u2022'}Responsável Categoria/Prioridade;</Text>
          <Text style={style.listItem}>{'\u2022'}Ação;</Text>
          <Text style={style.listItem}>{'\u2022'}Responsável;</Text>
          <Text style={style.listItem}>{'\u2022'}Prazo Previsto;</Text>
          <Text style={style.listItem}>{'\u2022'}Data de Conclusão Prevista;</Text>
          <Text style={style.listItem}>{'\u2022'}Status.</Text>
        </View>

        <View style={style.containerText}>
          <Text style={style.title}>Forma de acompanhamento: Através de reuniões mensais envolvendo a assessoria de segurança do trabalho, gerência, recursos humanos e encarregados de setores com o objetivo de acompanhar o andamento das ações propostas e corrigir desvios. Deve ser feito um registro dessas reuniões e arquivado de forma digital.</Text>
        </View>

        <View style={style.containerText}>
          <Text style={style.title}>Aferição dos Resultados: A aferição dos resultados deve ser feita anualmente e levar em conta os indicadores: afastamentos relacionados aos riscos, incidentes, acidentes e agravamento no relatório anual do PCMSO. Deve ser feita uma análise global das ações propostas, realizadas, não realizadas e os respectivos desvios. Deve ser gerado um relatório e arquivado de forma digital.</Text>
        </View>

        <FooterPage />
      </Page>
    );
  };

  const GROPage = () => {
    const style = StyleSheet.create({
      listItem: {
        marginBottom: 5,
        fontSize: 8,
        fontFamily: 'OpenSansLight',
      },

      list: {
        marginLeft: 20,
      },

      containerText: {
        margin: 10,
      },

      title: {
        fontSize: 12,
        fontFamily: 'OpenSansRegular',
      },

      paragraph: {
        fontSize: 10,
        fontFamily: 'OpenSansRegular',
      },

      space: {
        padding: 20,
      },
    });

    return (
      <Page style={PageStyles.Page}>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>14. Outros Documentos que Compõe o GRO (Gerenciamento de Riscos Ocupacionais)</Text>

        <View style={style.containerText}>
          <Text style={style.title}>Para elaboração do inventário dos riscos e determinar a graduação de riscos foram analisados os seguintes documentos/indicadores:</Text>
        </View>

        <View style={style.list}>
          <Text style={style.listItem}>{'\u2022'}Afastamentos;</Text>
          <Text style={style.listItem}>{'\u2022'}CAT abertas;</Text>
          <Text style={style.listItem}>{'\u2022'}Indicadores de incidentes e acidentes;</Text>
          <Text style={style.listItem}>{'\u2022'}Relatório anual do PCMSO;</Text>
          <Text style={style.listItem}>{'\u2022'}Relatório anual do PCMSO;</Text>
          <Text style={style.listItem}>{'\u2022'}Inventário de máquinas e equipamentos da NR 12;</Text>
          <Text style={style.listItem}>{'\u2022'}ASOs - Atestados de Saúde Ocupacional;</Text>
          <Text style={style.listItem}>{'\u2022'}Treinamentos NRs 11, 35;</Text>
          <Text style={style.listItem}>{'\u2022'}Avaliação Ergonômica Preliminar (SOC) NR 17;</Text>
          <Text style={style.listItem}>{'\u2022'}Condições sanitárias conforme NR 24.</Text>
        </View>

        <View style={style.space}></View>

        <Text style={TextStyles.subTitleSumary}>15. Percepção de Riscos Ocupacionais</Text>

        <View style={style.containerText}>
          <Text style={style.title}>A metodologia proposta ocorre durante a visita técnica de campo. O profissional elaborador do PGR promove entrevistas com o grupo de trabalhadores de cada GHE, encarregados e responsáveis aplicando perguntas e questionamentos relacionados a situações, ações ou condições, que tenham potencial direta ou indiretamente, de causar danos a pessoas, patrimônio ou meio ambiente. O trabalhador é estimulado a apontar situações de perigos aplicando os seguintes questionamentos:</Text>
        </View>

        <View style={style.list}>
          <Text style={style.listItem}>{'\u2022'}No seu dia a dia de trabalho há fatores que você tem a percepção que prejudicam os processos operacionais?;</Text>
          <Text style={style.listItem}>{'\u2022'}No seu dia a dia de trabalho há situações ou condições que contribuem para ocasionar incidentes?;</Text>
          <Text style={style.listItem}>{'\u2022'}Há alguma situação no seu trabalho que gera desconforto físico ou mental?;</Text>
          <Text style={style.listItem}>{'\u2022'}Dentro do seu setor de trabalho há situações que você indicaria alguma melhoria?;</Text>
          <Text style={style.listItem}>{'\u2022'}Há algum canal de comunicação entre você e seu imediato superior para apontar alguma situação de risco?;</Text>
          <Text style={style.listItem}>{'\u2022'}Dentro dos processos que são desenvolvidos diariamente na sua rotina, há alguma situação ou condição de risco ou perigo que não foi mapeada na matriz de risco apresentada?</Text>
        </View>

        <View style={style.containerText}>
          <Text style={style.title}>Outros questionamentos são realizados conforme dinâmica da visita técnica de campo e novas situações do ponto de vista do reconhecimento dos riscos</Text>
        </View>

        <FooterPage />
      </Page>
    );
  };

  const UnidadesPage = () => {
    return (
      <Page style={PageStyles.Page}>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>16. Unidades da empresa</Text>

        {/* Unidades */}
        {unidades.map((item, i) => (
          <View key={i} style={TableStyles.table}>
            <View style={TableStyles.headerCell}>
              <Text style={TextStyles.prefixTextTitle}>Unidade: </Text>
              <Text style={TextStyles.valueTextTitle}>{item.nome_unidade}</Text>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={TableStyles.twentyFiveRow}>
                <Text style={TextStyles.prefixText}>CNPJ:</Text>
                <Text style={TextStyles.valueText}>{item.cnpj_unidade || "N/A"}</Text>
              </View>
              <View style={TableStyles.twentyFiveRow}>
                <Text style={TextStyles.prefixText}>Cep:</Text>
                <Text style={TextStyles.valueText}>{item.cep_unidade}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <Text style={TextStyles.prefixText}>Endereço:</Text>
                <Text style={TextStyles.valueText}>{item.endereco_unidade}, {item.numero_unidade} - {item.complemento}</Text>
                <Text style={TextStyles.valueText}>{item.bairro_unidade} - {item.cidade_unidade}/{item.uf_unidade}</Text>
              </View>
            </View>
          </View>
        ))}

        <FooterPage />
      </Page>
    );
  };

  const PostPage = () => {

    const PostStyles = StyleSheet.create({
      postRow: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },

      postRowDesc: {
        padding: 10,
        width: '40%',
        flexDirection: 'row',
      },

      postRowFunc: {
        padding: 10,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      headerPostContentCell: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
      },

      headerPostCell: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      headerPostCellFunc: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      headerPostCellDesc: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      postText: {
        fontSize: 8,
      },

      tableRow: {
        paddingHorizontal: 5,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },

      row: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      coluun: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
      },

      containerFunc: {
        marginTop: 30,
      },

      subTitleSumary: {
        fontSize: 14,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },

    });

    return (
      <Page style={PageStyles.Page}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>17. Caracterização das Atividades e Cargos</Text>

        {/* Tabela de Setores e Cargos */}
        <View style={TableStyles.table}>
          <View style={PostStyles.headerPostContentCell}>
            <View style={PostStyles.headerPostCell}>
              <Text style={TextStyles.valueTextSignatureTitle}>Setor</Text>
            </View>
            <View style={PostStyles.headerPostCell}>
              <Text style={TextStyles.valueTextSignatureTitle}>Cargo</Text>
            </View>
            <View style={PostStyles.headerPostCellDesc}>
              <Text style={TextStyles.valueTextSignatureTitle}>Descrição detalhada do cargo</Text>
            </View>
            <View style={PostStyles.headerPostCellFunc}>
              <Text style={TextStyles.valueTextSignatureTitle}>Nº Funcionários</Text>
            </View>
          </View>
          {cargos.map((item, i) => (
            <View key={i} style={PostStyles.tableRow}>
              <View style={PostStyles.postRow}>
                <Text style={PostStyles.postText}>{findSetor(item.fk_setor_id)}</Text>
              </View>
              <View style={PostStyles.postRow}>
                <Text style={PostStyles.postText}>{item.nome_cargo}</Text>
              </View>
              <View style={PostStyles.postRowDesc}>
                <Text style={PostStyles.postText}>{item.descricao}</Text>
              </View>
              <View style={PostStyles.postRowFunc}>
                <Text style={PostStyles.postText}>Masc: {item.func_masc}</Text>
                <Text style={PostStyles.postText}>Fem: {item.func_fem}</Text>
                <Text style={PostStyles.postText}>Menor: {item.func_menor}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tabela Funcionários Total */}
        <View style={PostStyles.containerFunc}>

          {/* Título */}
          <Text style={PostStyles.subTitleSumary}>Total de Funcionários</Text>

          {/* Tabela */}
          <View style={TableStyles.table}>
            <View style={PostStyles.headerPostContentCell}>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Masculino</Text>
              </View>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Feminino</Text>
              </View>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Menor</Text>
              </View>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Total</Text>
              </View>
            </View>
            <View style={PostStyles.tableRow}>
              <View style={PostStyles.row}>
                <Text style={PostStyles.postText}>{getTotalFuncMasc()}</Text>
              </View>
              <View style={PostStyles.row}>
                <Text style={PostStyles.postText}>{getTotalFuncFem()}</Text>
              </View>
              <View style={PostStyles.row}>
                <Text style={PostStyles.postText}>{getTotalFuncMenor()}</Text>
              </View>
              <View style={PostStyles.row}>
                <Text style={PostStyles.postText}>{getTotalFunc()}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  const RiskInventoryPage = () => {

    const RiskInventoryStyles = StyleSheet.create({
      headerRow: {
        gap: 2,
        paddingHorizontal: 3,
        paddingVertical: 3,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
        color: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
      },

      dataRow: {
        paddingHorizontal: 3,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      headerCellCenter: {
        width: '10%',
        textAlign: 'center',
        fontSize: 6,
      },

      headerCell: {
        width: '10%',
        textAlign: 'left',
        fontSize: 6,
      },

      dataCell: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'left',
        flexDirection: 'row',
        fontSize: 6,
      },

      dataCellCenter: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'center',
        flexDirection: 'row',
        fontSize: 6,
        alignItems: 'center',
      },

      dataCellColor: {
        width: '10%',
        textAlign: 'center',
        fontSize: 6,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },

    });

    return (
      <Page size="A4" orientation='landscape' style={PageStyles.LandscapePage}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>18. Inventário de Riscos</Text>

        {/* Tabela do Inventário */}
        <View style={TableStyles.table}>
          {/* Header */}
          <View style={RiskInventoryStyles.headerRow}>
            <Text style={RiskInventoryStyles.headerCellCenter}>ID</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Data</Text>
            <Text style={RiskInventoryStyles.headerCell}>Unidade</Text>
            <Text style={RiskInventoryStyles.headerCell}>Setor</Text>
            <Text style={RiskInventoryStyles.headerCell}>Processo</Text>
            <Text style={RiskInventoryStyles.headerCell}>Risco</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Tipo</Text>
            <Text style={RiskInventoryStyles.headerCell}>Consequência</Text>
            <Text style={RiskInventoryStyles.headerCell}>Fontes</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Pessoas Expostas</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Avaliação</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Frequência</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Medição</Text>
            <Text style={RiskInventoryStyles.headerCell}>Aparelho</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Limite de Tolerância</Text>
            <Text style={RiskInventoryStyles.headerCell}>Metodologia</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Medidas</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Probabilidade</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Severidade</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Nível</Text>
            <Text style={RiskInventoryStyles.headerCell}>Comentários</Text>
          </View>
          {/* Body */}
          {inventario.map((item, i) => (
            <View key={i} style={RiskInventoryStyles.dataRow}>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.id_inventario || ''}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{formatData(item.data_inventario) || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_unidade_id, 'nome_unidade')}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_setor_id, 'nome_setor')}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_processo_id, 'nome_processo')}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_risco_id, 'nome_risco') || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{find(item.fk_risco_id, 'grupo_risco') || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_risco_id, 'consequencia') || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{item.fontes || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.pessoas_expostas || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{find(item.fk_risco_id, 'avaliacao') || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.frequencia || '0'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.medicao + " " + find(item.fk_risco_id, 'unidade_medida') || '0'}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_aparelho_id, 'nome_aparelho') || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{find(item.fk_risco_id, 'limite_tolerancia') + " " + find(item.fk_risco_id, 'unidade_medida') || '0'}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_risco_id, 'metodologia') || 'N/A'}</Text>
              <View style={RiskInventoryStyles.dataCell}>
                <Text>{convertMedidas(item.medidas) || 'N/A'}</Text>
              </View>
              <View style={{ ...RiskInventoryStyles.dataCellColor, backgroundColor: getColor(item.probabilidade) }}>
                <Text>{convertProbSev(item.probabilidade) || 'N/A'}</Text>
              </View>
              <View style={{ ...RiskInventoryStyles.dataCellColor, backgroundColor: getColor(find(item.fk_risco_id, 'severidade')) }}>
                <Text>{convertProbSev(find(item.fk_risco_id, 'severidade')) || 'N/A'}</Text>
              </View>
              <View style={{ ...RiskInventoryStyles.dataCellColor, backgroundColor: getColorNivel(item.nivel) }}>
                <Text>{convertNivel(item.nivel) || 'N/A'}</Text>
              </View>
              <Text style={RiskInventoryStyles.dataCell}>{item.comentarios || ''}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  const PlanPage = () => {

    const PlanStyles = StyleSheet.create({
      headerRow: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
        color: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
      },

      dataRow: {
        paddingHorizontal: 3,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },

      headerCellCenter: {
        width: '10%',
        textAlign: 'center',
        fontSize: 8,
      },

      headerCell: {
        width: '10%',
        textAlign: 'left',
        fontSize: 8,
      },

      dataCell: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'left',
        flexDirection: 'row',
        fontSize: 8,
      },

      dataCellCenter: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'center',
        flexDirection: 'row',
        fontSize: 8,
      },

      dataCellColor: {
        width: '10%',
        textAlign: 'center',
        fontSize: 8,
        height: '100%',
        justifyContent: 'center',
      },

    });

    return (
      <Page size="A4" orientation='landscape' style={PageStyles.LandscapePage}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>19. Plano de Ação</Text>

        {/* Tabela do Inventário */}
        <View style={TableStyles.table}>
          {/* Header */}
          <View style={PlanStyles.headerRow}>
            <Text style={PlanStyles.headerCellCenter}>ID</Text>
            <Text style={PlanStyles.headerCellCenter}>Data</Text>
            <Text style={PlanStyles.headerCell}>Unidade</Text>
            <Text style={PlanStyles.headerCell}>Setor</Text>
            <Text style={PlanStyles.headerCell}>Responsável</Text>
            <Text style={PlanStyles.headerCell}>Processo</Text>
            <Text style={PlanStyles.headerCell}>Risco</Text>
            <Text style={PlanStyles.headerCellCenter}>Tipo</Text>
            <Text style={PlanStyles.headerCell}>Medida</Text>
            <Text style={PlanStyles.headerCellCenter}>Prazo</Text>
            <Text style={PlanStyles.headerCellCenter}>Data de Conclusão</Text>
            <Text style={PlanStyles.headerCellCenter}>Status</Text>
          </View>
          {/* Body */}
          {plano.map((item, i) => (
            <View key={i} style={PlanStyles.dataRow}>
              <Text style={PlanStyles.dataCellCenter}>{item.id_plano}</Text>
              <Text style={PlanStyles.dataCellCenter}>{formatData(item.data) || ""}</Text>
              <Text style={PlanStyles.dataCell}>{find(item.fk_unidade_id, 'nome_unidade')}</Text>
              <Text style={PlanStyles.dataCell}>{find(item.fk_setor_id, 'nome_setor')}</Text>
              <Text style={PlanStyles.dataCell}>{item.responsavel || 'N/A'}</Text>
              <Text style={PlanStyles.dataCell}>{find(item.fk_processo_id, 'nome_processo')}</Text>
              <Text style={PlanStyles.dataCell}>{find(item.fk_risco_id, 'nome_risco') || 'N/A'}</Text>
              <Text style={PlanStyles.dataCellCenter}>{findTipo(item.tipo_medida) || 'N/A'}</Text>
              <Text style={PlanStyles.dataCell}>{findMedidas(item.fk_medida_id, item.tipo_medida) || 'N/A'}</Text>
              <Text style={PlanStyles.dataCellCenter}>{item.prazo}</Text>
              <Text style={PlanStyles.dataCellCenter}></Text>
              <View style={{ ...PlanStyles.dataCellColor, backgroundColor: getColorStatus(item.status) }}>
                <Text>{item.status || 'N/A'}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  const MyDocument = () => {
    return (
      <Document>
        <CoverPage />
        {/* <SumaryPage /> */}
        <VersionTable />
        <CompanyPage />
        <IntroductionPage />
        <AbrangencePage />
        <DefinePage />
        <StrategyPage />
        <RiskIdentificationPage />
        <AssessmentPage />
        <AssessmentTable />
        <AssessmentFrame />
        <AssessmentText />
        <AssessmentFrameSeverity />
        <AssessmentFrameText />
        <AssessmentFrameSeven />
        <FrequencyPage />
        <GROPage />
        <UnidadesPage />
        <PostPage />
        <RiskInventoryPage />
        <PlanPage />
      </Document>
    );
  };

  return MyDocument();
}

export default PdfGenerate;
